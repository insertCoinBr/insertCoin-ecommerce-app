/**
 * Serviço para upload de imagens no Cloudinary
 */

// Configurações do Cloudinary
// IMPORTANTE: Substitua com suas credenciais do Cloudinary
const CLOUDINARY_CLOUD_NAME = 'dkz79dxka'; // Ex: 'insertcoin-app'
const CLOUDINARY_UPLOAD_PRESET = 'products_preset'; // Ex: 'products_preset'
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

/**
 * Faz upload de uma imagem para o Cloudinary
 * @param {string} imageUri - URI da imagem local (do ImagePicker)
 * @param {Object} options - Opções adicionais
 * @param {string} options.folder - Pasta no Cloudinary (opcional)
 * @param {Function} options.onProgress - Callback de progresso (opcional)
 * @returns {Promise<Object>} Objeto com informações da imagem (url, public_id, etc)
 */
export const uploadImage = async (imageUri, options = {}) => {
  try {
    if (!imageUri) {
      throw new Error('Image URI is required');
    }

    // Validar configurações
    if (CLOUDINARY_CLOUD_NAME === 'YOUR_CLOUD_NAME' ||
        CLOUDINARY_UPLOAD_PRESET === 'YOUR_UPLOAD_PRESET') {
      throw new Error('Please configure Cloudinary credentials in cloudinaryService.js');
    }

    console.log('Starting upload to Cloudinary...');
    console.log('Cloud Name:', CLOUDINARY_CLOUD_NAME);
    console.log('Upload Preset:', CLOUDINARY_UPLOAD_PRESET);
    console.log('Image URI:', imageUri);

    // Extrair informações do arquivo
    const filename = imageUri.split('/').pop();
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : 'image/jpeg';

    console.log('File type:', type);
    console.log('Filename:', filename);

    // Criar FormData
    const formData = new FormData();
    formData.append('file', {
      uri: imageUri,
      type: type,
      name: filename,
    });
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    // Adicionar pasta se fornecida
    if (options.folder) {
      formData.append('folder', options.folder);
      console.log('Folder:', options.folder);
    }

    console.log('Uploading to:', CLOUDINARY_UPLOAD_URL);

    // Fazer upload
    const response = await fetch(CLOUDINARY_UPLOAD_URL, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
      },
    });

    console.log('Response status:', response.status);

    const data = await response.json();
    console.log('Response data:', data);

    if (!response.ok) {
      const errorMessage = data.error?.message || JSON.stringify(data) || 'Failed to upload image';
      console.error('Upload failed:', errorMessage);
      throw new Error(`Cloudinary error: ${errorMessage}`);
    }

    console.log('Upload successful!');
    return {
      url: data.secure_url,
      publicId: data.public_id,
      width: data.width,
      height: data.height,
      format: data.format,
      resourceType: data.resource_type,
      createdAt: data.created_at,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    console.error('Error details:', error.message);
    throw error;
  }
};

/**
 * Faz upload de múltiplas imagens para o Cloudinary
 * @param {Array<string>} imageUris - Array de URIs de imagens
 * @param {Object} options - Opções adicionais
 * @returns {Promise<Array<Object>>} Array com informações das imagens
 */
export const uploadMultipleImages = async (imageUris, options = {}) => {
  try {
    const uploadPromises = imageUris.map(uri => uploadImage(uri, options));
    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error('Multiple upload error:', error);
    throw error;
  }
};

/**
 * Valida se a imagem tem tamanho permitido
 * @param {string} imageUri - URI da imagem
 * @param {number} maxSizeMB - Tamanho máximo em MB (padrão: 5MB)
 * @returns {Promise<boolean>} true se válida
 */
export const validateImageSize = async (imageUri, maxSizeMB = 5) => {
  try {
    const response = await fetch(imageUri);
    const blob = await response.blob();
    const sizeMB = blob.size / (1024 * 1024);

    if (sizeMB > maxSizeMB) {
      throw new Error(`Image size (${sizeMB.toFixed(2)}MB) exceeds maximum allowed (${maxSizeMB}MB)`);
    }

    return true;
  } catch (error) {
    console.error('Image validation error:', error);
    throw error;
  }
};

export default {
  uploadImage,
  uploadMultipleImages,
  validateImageSize,
};
