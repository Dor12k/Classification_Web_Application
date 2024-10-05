
import os
import json
import boto3
import numpy as np
import tensorflow as tf

from PIL import Image
from django.conf import settings
# import matplotlib.pyplot as plt

# Limit AWS cost by limit prediction requests from users 
prediction_requests = 0
TOTLAL_PREDICTION_REQUESTS = 20

# MODEL.compiled_metrics == None
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'

# Model prediction classes
CLASS_NAMES = ["Angular Leaf Spot", "Anthracnose Fruit Rot", "Blossom Blight", "Gray Mold", "Leaf Spot", "Powdery Mildew Fruit", "Powdery Mildew Leaf"]

# Define the path where the model should be saved
# MODEL_LOCAL_PATH = os.path.join(settings.BASE_DIR, 'models', 'saved_model.pb')
MODEL_LOCAL_PATH = os.path.join(settings.BASE_DIR, 'models', 'Strawberry_Diseases_ResNet50_87.h5')

# Model directory
MODEL_DIR = os.path.join(settings.BASE_DIR, 'models')

# Init model
MODEL = None

os.makedirs(MODEL_DIR, exist_ok=True)

# Function download Tensorflow model from AWS S3 bucket.
def download_model_from_s3():
    
    # Initialize the boto3 S3 client
    s3 = boto3.client('s3')
    
    # Define S3 bucket name and the file path in S3
    bucket_name = os.getenv('AWS_STORAGE_BUCKET_NAME')
    s3_model_key = 'static/classification/model/Strawberry_Diseases_ResNet50_87.h5'
    
    # Download the file
    try:
        print("Model Downloading...")
        s3.download_file(bucket_name, s3_model_key, MODEL_LOCAL_PATH)
        print(f"Model downloaded successfully to {MODEL_LOCAL_PATH}")
    
    except Exception as e:
        print(f"Error downloading model from S3: {e}")

# Load model after it downloaded
def load_model():

    global MODEL

    # Load from AWS S3 Bucket
    try:
        # MODEL = tf.keras.models.load_model(MODEL_LOCAL_PATH)
        MODEL = tf.saved_model.load(MODEL_DIR)
        print("\nModel loaded successfuly\n")
    except Exception as e:
        print(f"\nError load model: {e}\n")
        # logger.error(f"Error during prediction: {e}", exc_info=True)

# Download and load model
def init_class():

    download_model_from_s3()
    load_model()

# init_class()



# ------------------------------------------------------------------------------------------------------------------------------- #

class ModelPrediction():

    # Method mske the model prediction
    def predict(self, image):

        # Increse the number of prediction requsts
        global prediction_requests
        global TOTLAL_PREDICTION_REQUESTS

        # The number of prediction is limit by TOTLAL_PREDICTION_REQUESTS
        if prediction_requests < TOTLAL_PREDICTION_REQUESTS:

            prediction_requests = prediction_requests + 1
            print("TOTLAL_PREDICTION_REQUESTS: ", TOTLAL_PREDICTION_REQUESTS)

            try:
                # Function convert image to tensor image in shape (1, 224, 224, 3)
                tensor_image = ModelPrediction.sageMaker_image_processing(self, image)

                # Prediction model using model.h5
                # prediction = MODEL.predict(tensor_image)

                # Prediction model using saved_model.pb
                # prediction = ModelPrediction.predict_saved_model(self, tensor_image)

                # Prediction model using SageMaker from AWS
                # prediction = ModelPrediction.sageMaker_prediction(self, tensor_image)
                prediction = ModelPrediction.serverless_prediction(self, tensor_image)

                # Your prediction logic
                predicted_class, confidence = ModelPrediction.extract_prediction(self, prediction)
                
                status, log = "Successful", "Model predicted successfuly"
                
                return predicted_class, confidence, status, log, prediction_requests
            
            except Exception as log:

                # logger.error(f"Error during prediction: {log}", exc_info=True)
                
                predicted_class, confidence, status, log = "None", "0", "Successful", "Model predicted successfuly"

                return predicted_class, confidence, status, log, prediction_requests
        
        else:
            predicted_class, confidence, status, log = "None", "0", "Field", "The number of prediction requests is over"

            # logger.error(f"Error during prediction: {log}", exc_info=True)

            return predicted_class, confidence, status, log, prediction_requests

    # Method design the modelprediction
    def extract_prediction(self, prediction):

        predicted_class = CLASS_NAMES[np.argmax(prediction[0])]
        confidence = np.max(prediction[0])

        confidence = confidence * 100
        confidence = round(confidence, 0)

        return predicted_class, confidence
    
    # Function for saved_model.pb case
    def predict_saved_model(self, tensor_image):

        infer = MODEL.signatures['serving_default']

        prediction = infer(tensor_image)

        prediction = prediction['dense_2']

        return prediction

    # Image processing for SageMaker
    def sageMaker_image_processing(self, image):
        '''
        Function get image type: <class 'django.core.files.uploadedfile.InMemoryUploadedFile'>
        and return tensor_image type:  <class 'numpy.ndarray'> in shape (1, 224, 224, 3)
        '''

        # Convert uploaded image to a format that can be processed
        byte_img = Image.open(image)

        # Convert the image to RGB (in case it's not)
        byte_img = byte_img.convert("RGB")

        # Resize the image to (224, 224)
        byte_img = byte_img.resize((224, 224))

        # Convert the image to a NumPy array
        image_array = np.array(byte_img) 

        # For display image -> normalize pixel values (0-255 -> 0-1)
        # image_array = image_array / 255.0

        # Conver image to type float32
        image_array = image_array.astype(np.float32)

        # Ensure the array is of shape (1, 224, 224, 3)
        tensor_image = np.expand_dims(image_array, axis=0)

        # Convert the image to a tensor type
        tensor_image = tf.convert_to_tensor(tensor_image)

        return tensor_image

    # Prediction from AWS SageMaker
    def sageMaker_prediction(self, image):

        input_data = image
        
        # Initialize a session using your IAM role
        runtime = boto3.Session().client('sagemaker-runtime')

        # Define your endpoint name
        endpoint_name = 'tensorflow-inference-2024-09-29-22-02-07-977'  # Replace with your actual endpoint name

        # Assuming input_data is a tensor and convert the tensor to a NumPy array
        input_data = input_data.numpy()  # Convert the tensor to a NumPy array

        # Assuming input_data is a NumPy array of shape (1, 224, 224, 3)
        payload = json.dumps(input_data.tolist())

        # Call the SageMaker endpoint
        response = runtime.invoke_endpoint(
            EndpointName=endpoint_name,
            ContentType='application/json',
            Body=payload
        )

        # Process the response
        result = json.loads(response['Body'].read().decode())

        # Extract the model prediction
        predictions = result['predictions']

        return predictions

    # Prediction from AWS Serverless
    def serverless_prediction(self, image):
        
        # Initialize a session using your IAM role
        runtime = boto3.Session().client('sagemaker-runtime', region_name='us-east-1')

        # Define your serverless endpoint name
        endpoint_name = 'aiStrawberries-serverless-endpoint'  # Replace with your actual serverless endpoint name

        # Assuming input_data is a tensor, convert the tensor to a NumPy array
        input_data = image.numpy()  # Convert the tensor to a NumPy array

        # Ensure the input_data has the correct shape (1, 224, 224, 3)
        # Here, we assume input_data is already in the correct shape
        payload = json.dumps(input_data.tolist())

        # Call the SageMaker serverless endpoint
        response = runtime.invoke_endpoint(
            EndpointName=endpoint_name,
            ContentType='application/json',  # Ensure this matches your serverless endpoint's expected content type
            Body=payload
        )

        # Process the response
        result = json.loads(response['Body'].read().decode())

        # Extract the model prediction
        predictions = result['predictions']  # Adjust this if the response structure is different
        
        return predictions

