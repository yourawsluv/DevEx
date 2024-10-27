const axios = require('axios');

// Figma API токен и ID файла
const API_TOKEN = 'YOUR_FIGMA_API_TOKEN';
const FILE_ID = 'YOUR_FILE_ID';

// Конфигурация для API Figma
const config = {
  headers: {
    'X-Figma-Token': API_TOKEN,
  },
};

// Создание фреймов (экранов) для каждой страницы приложения
async function createFrames() {
  try {
    const framesData = [
      {
        name: 'Home Page',
        width: 1440,
        height: 1024,
      },
      {
        name: 'Services Page',
        width: 1440,
        height: 1024,
      },
      {
        name: 'Pricing Calculator',
        width: 1440,
        height: 1024,
      },
      {
        name: 'Order Placement',
        width: 1440,
        height: 1024,
      },
      {
        name: 'User Dashboard',
        width: 1440,
        height: 1024,
      },
      {
        name: 'Contacts and FAQ',
        width: 1440,
        height: 1024,
      },
    ];
    const promises = framesData.map(async (frame) => {
      return axios.post(
        `https://api.figma.com/v1/files/${FILE_ID}/nodes`,
        {
          name: frame.name,
          visible: true,
          type: 'FRAME',
          absoluteBoundingBox: {
            width: frame.width,
            height: frame.height,
          },
        },
        config
      );
    });
    await Promise.all(promises);
    console.log('Frames created successfully!');
  } catch (error) {
    console.error('Error creating frames:', error);
  }
}

// Добавление текста на страницы
async function addTextToFrame(frameId, textContent) {
  try {
    await axios.post(
      `https://api.figma.com/v1/files/${FILE_ID}/nodes/${frameId}/children`,
      {
        name: 'Text Element',
        visible: true,
        type: 'TEXT',
        characters: textContent,
        style: {
          fontSize: 16,
          fontWeight: 400,
          fontFamily: 'Roboto',
        },
      },
      config
    );
    console.log(`Text added to frame ${frameId}`);
  } catch (error) {
    console.error('Error adding text:', error);
  }
}

// Запуск функций
createFrames()
  .then(() => addTextToFrame('0:1', 'Welcome to the Home Page'))
  .catch((error) => console.error('Error:', error));
