from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
from diffusers import DiffusionPipeline

app = Flask(__name__)
CORS(app)  # Enable CORS for all origins

if torch.cuda.is_available():
    device = "cuda"
else:
    device = "cpu"

pipe = DiffusionPipeline.from_pretrained("stabilityai/stable-diffusion-xl-base-1.0", torch_dtype=torch.float16, use_safetensors=True, variant="fp16")
pipe.to(device)

@app.route('/generate_image', methods=['POST'])
def generate_image():
    data = request.get_json()
    if 'prompt' in data:
        prompt = data['prompt']
        images = pipe(prompt=prompt).images[0].cpu().numpy()
        # Convert images to base64 or another suitable format for transmission
        # You can return images as base64 strings or save them and return URLs
        return jsonify({'images': images.tolist()})
    else:
        return jsonify({'error': 'Prompt not provided'})

if __name__ == '__main__':
    app.run(debug=True)
