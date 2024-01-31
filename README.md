This repository contains a web application that uses OpenAI APIs to create new images, create variations of an existing image, check moderation for a particular prompt, and edit an existing image.  An OpenAI developer key is required to use the application.  Click the gear icon in the upper right-hand corner of the application to enter a valid key. 

Images can be created with either the Dall-e-2 and Dall-e-3 models.  Dall-e-3 images are substantially better quality.  OpenAI currently limits image variations and editing to the Dall-e-2 model.

A mask file is required for image editing.  Mask files of existing images (sqaure, PNG, less than 4MB) can be created using this tool:  https://ai-image-editor.netlify.app/

To learn more about the mask tool:  https://medium.com/@david.richards.tech/how-to-create-openai-dall-e-mask-images-ed8feb562eba

Although the application began to showcase OpenAI image processing, it has been subsequently modified to support audio functionality -- TTS, transcription, and translation.  

Note:  At this point translation is not working.  It acts like transcription and not translation to English.  I believe this is a problem with the OpenAI API and not this code.
