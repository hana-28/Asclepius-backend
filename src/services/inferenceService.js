const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

async function predictClassification(model, image) {
  try {
    const tensor = tf.node
      .decodeJpeg(image)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat()

    const prediction = model.predict(tensor);
    const cancerProbability = await prediction.dataSync()[0];

    const confidenceScore = cancerProbability * 100;

    const classes = ['Cancer', 'Non-cancer'];
    const label = confidenceScore > 50 ? classes[0] : classes[1];

    let suggestion;

    if (label === 'Cancer') {
      suggestion = "Segera periksa ke dokter!"
    }

    else {
      suggestion = "Konsultasi ke dokter untuk mengetahui penyakit!"
    }

    return { confidenceScore, label, suggestion };
  } catch (error) {
    throw new InputError('Terjadi kesalahan dalam melakukan prediksi');
  }
}

module.exports = predictClassification;