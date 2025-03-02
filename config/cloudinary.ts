import env from '#start/env'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: env.get('CLOUDINARY_CLOUD_NAME'),
  api_key: env.get('CLOUDINARY_API_KEY'),
  api_secret: env.get('CLOUDINARY_API_SECRET'),
})

export const zeroCloudinary = cloudinary

//;(async function () {
//  // Upload an image
//  const uploadResult = await cloudinary.uploader
//    .upload('https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//      public_id: 'shoes',
//    })
//    .catch((error) => {
//      console.log(error)
//    })
//
//  console.log(uploadResult)
//
//  // Optimize delivery by resizing and applying auto-format and auto-quality
//  const optimizeUrl = cloudinary.url('shoes', {
//    fetch_format: 'auto',
//    quality: 'auto',
//  })
//
//  console.log(optimizeUrl)
//
//  // Transform the image: auto-crop to square aspect_ratio
//  const autoCropUrl = cloudinary.url('shoes', {
//    crop: 'auto',
//    gravity: 'auto',
//    width: 500,
//    height: 500,
//  })
//
//  console.log(autoCropUrl)
//})()
