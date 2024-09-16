import React, { useRef, useEffect, useState } from 'react';
import { Product } from '../utils/insuranceTypes';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



// Function to get the product label


// Function to get the product icon
const getProductIcon = (product: Product): React.ReactNode => {
  switch (product) {
    case 'LTD': return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="Medical-Instrument-Wheelchair--Streamline-Freehand.svg"><desc>Medical Instrument Wheelchair Streamline Icon: https://streamlinehq.com</desc><g><path d="M11.53 12.84a4.51 4.51 0 0 0 -1.95 -0.15 4 4 0 0 0 -3.21 2.92 3.37 3.37 0 0 0 1.57 3.92 3 3 0 0 0 1.18 0.37c0.88 0.1 3.7 0.13 4.76 -2.32a3.45 3.45 0 0 0 -0.63 -3.71 3.75 3.75 0 0 0 -1.72 -1.03ZM13 17.23a3.18 3.18 0 0 1 -3.51 1.94 2.36 2.36 0 0 1 -2 -3.23 2.84 2.84 0 0 1 2.27 -2 3.68 3.68 0 0 1 1.43 0.09 2.7 2.7 0 0 1 1.22 0.64 2.41 2.41 0 0 1 0.59 2.56Z" fill="#0c6fff" fill-rule="evenodd" stroke-width="1"></path><path d="M23.51 17c-0.61 0.12 -1.22 0.22 -1.83 0.36 -0.26 0.06 -0.52 0.12 -0.77 0.2l-0.37 0.12 0 -0.1c-0.3 -1.65 -0.42 -3.33 -0.66 -5 -0.11 -0.74 -0.24 -1.46 -0.42 -2.18a7.47 7.47 0 0 0 -0.82 -2 3.22 3.22 0 0 0 -1.14 -1.17 3.35 3.35 0 0 0 -1.35 -0.38 15.26 15.26 0 0 0 -1.8 0c-1 0.05 -2.1 0.11 -3.16 0.15H9.64a1.94 1.94 0 0 0 0 -0.24l0 -1.28 -0.08 -1.2 -0.19 -0.77a1.41 1.41 0 0 0 -1.09 -1 3.32 3.32 0 0 0 -1.28 0.2l0 -0.3a0.37 0.37 0 0 0 -0.38 -0.29 0.33 0.33 0 0 0 -0.27 -0.51H3.66l-1.57 0a3.74 3.74 0 0 0 -0.74 0.09 1.61 1.61 0 0 0 -0.59 0.3A1.94 1.94 0 0 0 0 3.48a1.41 1.41 0 0 0 0.66 1.17 3.77 3.77 0 0 0 1.85 0.54 11.11 11.11 0 0 0 2.56 -0.26 4.92 4.92 0 0 0 1.15 -0.24 1.49 1.49 0 0 0 0.54 -0.37 1.37 1.37 0 0 0 0.34 -0.83s0 -0.05 0 -0.08a3.27 3.27 0 0 1 0.83 0 0.5 0.5 0 0 1 0.44 0.44l0.05 0.58 0 1.11c0.07 0.88 0.05 1.77 0.1 2.66a11.16 11.16 0 0 0 0.22 1.83 0.36 0.36 0 0 0 0.42 0.32 0.37 0.37 0 0 0 0.33 -0.35 9.27 9.27 0 0 1 0 -1.29c0 -0.3 0.05 -0.61 0.08 -0.91 0.53 0 1.06 0.09 1.6 0.11 1.06 0.06 2.13 0.1 3.18 0.14a15.91 15.91 0 0 1 1.65 0.02 2.32 2.32 0 0 1 0.87 0.26 2 2 0 0 1 0.7 0.73 6.87 6.87 0 0 1 0.71 1.68c0.12 0.37 0.2 0.76 0.29 1.13l-1.24 -0.06 -0.69 0a4.06 4.06 0 0 0 -0.7 0.09 5.72 5.72 0 0 0 -0.83 0.26c-0.11 -0.12 -0.2 -0.25 -0.32 -0.36a5.39 5.39 0 0 0 -1 -0.72 7.29 7.29 0 0 0 -1.11 -0.48 7 7 0 0 0 -1 -0.25 5.53 5.53 0 0 0 -1.07 -0.06 6.92 6.92 0 0 0 -3.92 1.44c-2.85 2.16 -2.37 3.61 -2.6 4.32a3.45 3.45 0 0 0 -0.17 0.86 5.26 5.26 0 0 0 0.67 2.69 5.06 5.06 0 0 0 1.91 2.06 6.43 6.43 0 0 0 0.91 0.37 8.75 8.75 0 0 0 1.37 0.28 8 8 0 0 0 3.9 -0.33 5.35 5.35 0 0 0 3 -2.71 7.83 7.83 0 0 0 0.75 -3.49c0.23 0.05 0.47 0.1 0.72 0.13a2.91 2.91 0 0 0 0.51 0 4.4 4.4 0 0 0 0.51 0c0.41 -0.05 0.8 -0.14 1.21 -0.22 0.13 0.69 0.27 1.39 0.44 2.07a0.32 0.32 0 0 0 0.11 0.17c-0.49 0.21 -1 0.44 -1.47 0.63a0.33 0.33 0 0 0 0.15 0.65 17.66 17.66 0 0 0 1.9 -0.21 7.44 7.44 0 0 0 0.78 -0.2c0.25 -0.08 0.5 -0.18 0.75 -0.28 0.58 -0.24 1.13 -0.52 1.7 -0.77a0.38 0.38 0 0 0 -0.23 -0.72ZM6.3 3.26a0.69 0.69 0 0 1 -0.17 0.45 0.64 0.64 0 0 1 -0.34 0.13 5.18 5.18 0 0 1 -0.85 0.08A12.82 12.82 0 0 1 2.61 4a2.79 2.79 0 0 1 -1.26 -0.39 0.26 0.26 0 0 1 -0.07 -0.31 0.82 0.82 0 0 1 0.23 -0.35 0.8 0.8 0 0 1 0.24 -0.13 4 4 0 0 1 0.45 -0.12l1.5 -0.15 2.62 -0.28a0.38 0.38 0 0 0 -0.06 0.31 3 3 0 0 1 0.04 0.68Zm8.25 15.46a4.27 4.27 0 0 1 -2.31 2.13 7 7 0 0 1 -3.33 0.41 7.24 7.24 0 0 1 -1 -0.15 3.88 3.88 0 0 1 -0.93 -0.3 4.15 4.15 0 0 1 -1.63 -1.62 4.52 4.52 0 0 1 -0.68 -2.26 3.11 3.11 0 0 1 0.11 -0.68 5.07 5.07 0 0 1 2.46 -3.8 5.93 5.93 0 0 1 3.42 -1.13 5.12 5.12 0 0 1 0.87 0.08 6.32 6.32 0 0 1 0.85 0.24 6.18 6.18 0 0 1 0.9 0.43 3.94 3.94 0 0 1 0.77 0.59 4.18 4.18 0 0 1 1.19 2.85 6.75 6.75 0 0 1 -0.69 3.21Zm3.62 -4a4.73 4.73 0 0 0 -0.53 0 3.12 3.12 0 0 0 -0.52 0 6.33 6.33 0 0 0 -0.75 0.19 5.59 5.59 0 0 0 -0.63 -1.91 5.27 5.27 0 0 0 0.56 0c0.37 0 0.74 0 1.11 -0.06l1.39 -0.33a0.44 0.44 0 0 1 0 0.1c0.15 0.7 0.28 1.41 0.41 2.12 -0.33 0 -0.68 -0.08 -1.04 -0.12Z" fill="#020202" fill-rule="evenodd" stroke-width="1"></path></g></svg>;
    case 'STD': return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="Medical-Instrument-Walking-Aid--Streamline-Freehand.svg"><desc>Medical Instrument Walking Aid Streamline Icon: https://streamlinehq.com</desc><g><path d="M22.41 22a3.36 3.36 0 0 0 -1 -1.21 3.47 3.47 0 0 0 -1.91 -0.75h-0.2c0 -0.32 0.09 -0.82 0.14 -1.42 0.18 -2.26 0.41 -6 0.48 -6.64 0 -0.37 0.07 -0.74 0.08 -1.11s0 -0.51 0 -0.76a2.9 2.9 0 0 0 -1.68 -2.72 6.42 6.42 0 0 0 -2.8 -0.39c-1.33 0 -2.75 0.24 -3.91 0.27 -1 0 -2 0.06 -3 0.13 -0.47 0 -0.95 0.08 -1.42 0.15 0.06 -0.42 0.13 -0.83 0.21 -1.24 0.11 -0.61 0.23 -1.61 0.44 -2.51a4.91 4.91 0 0 1 0.51 -1.48s1 0 1.23 0q0.75 -0.07 1.59 -0.09c1.16 0 2.39 0 3.48 -0.09a1.91 1.91 0 0 0 0.1 0.34 1.7 1.7 0 0 0 0.44 0.67 1.09 1.09 0 0 0 0.61 0.25 6.11 6.11 0 0 0 1 0 17.54 17.54 0 0 0 2.92 0.06 2.92 2.92 0 0 0 1.36 -0.58 1.72 1.72 0 0 0 0.63 -1.52 1.32 1.32 0 0 0 -0.7 -1 1.86 1.86 0 0 0 -0.59 -0.19A7.2 7.2 0 0 0 19.36 0h-1.65l-1.37 0c-0.46 0 -0.91 0.13 -1.34 0.18s-0.51 0.56 -0.48 0.71a5.58 5.58 0 0 1 0.08 0.57c-1.07 0 -2.26 -0.09 -3.4 -0.12l-1.65 0a9.67 9.67 0 0 0 -1.19 0.06 1.28 1.28 0 0 0 -0.73 0.35 3.94 3.94 0 0 0 -0.67 1.33 25.94 25.94 0 0 0 -0.6 3c-0.12 0.71 -0.23 1.41 -0.31 2.12 -0.63 5.38 -0.9 7.33 -0.7 8a0.34 0.34 0 0 0 0.66 0c0.11 -0.57 0.2 -0.93 0.28 -1.55 0 -0.25 0.06 -0.5 0.1 -0.75 1.31 0.06 2.83 0.11 4.38 0.1 0.82 0 1.64 0 2.43 -0.05s1.69 -0.09 2.43 -0.1 1.39 -0.1 2.09 -0.12a7.45 7.45 0 0 1 1.16 0.06c0 1.19 -0.06 2.73 -0.11 4 0 1.11 -0.07 2 -0.11 2.39 -0.1 0 -0.94 0.21 -1.93 1.93a1.3 1.3 0 0 0 -0.26 1 1 1 0 0 0 0.44 0.47 3 3 0 0 0 1 0.34 6.36 6.36 0 0 0 1.24 0.12 12.05 12.05 0 0 0 1.8 -0.17 5.79 5.79 0 0 0 0.73 -0.14 1.29 1.29 0 0 0 0.46 -0.26 1.2 1.2 0 0 0 0.27 -1.47ZM16.35 0.74c0.45 0 0.89 0 1.33 0.07l1.6 0.14c0.26 0 0.58 0 0.88 0.1a1 1 0 0 1 0.39 0.13 0.29 0.29 0 0 1 0.15 0.31 0.67 0.67 0 0 1 -0.25 0.46 2.2 2.2 0 0 1 -1.21 0.42c-0.81 0.08 -1.7 0 -2.39 0 -0.22 0 -0.54 0.08 -0.84 0.08a0.49 0.49 0 0 1 -0.3 0 1 1 0 0 1 -0.33 -0.45c-0.12 -0.38 -0.14 -0.82 -0.25 -1.2 0.41 -0.07 0.81 -0.07 1.22 -0.06Zm1.37 12.2c-0.7 0 -1.41 0 -2.1 -0.07l-1.58 0 -2.35 0 -1.17 0.05c-1.44 0.1 -2.84 0.23 -4.08 0.31 0.21 -1.7 0.39 -3.41 0.65 -5.11C7.61 8.07 8.14 8 8.65 8l3 0c1.63 0 3.84 -0.27 5.46 0.09a2.07 2.07 0 0 1 1.86 2.05l0 1.73 0 1.14a8.81 8.81 0 0 0 -1.25 -0.07Zm3.64 9.7 -0.63 0.11a12.21 12.21 0 0 1 -1.37 0.19A6.79 6.79 0 0 1 18 23a2.84 2.84 0 0 1 -0.44 -0.06l-0.39 -0.1c-0.06 0 0 -0.13 0.07 -0.21a3.35 3.35 0 0 1 0.29 -0.4c1.09 -1.29 0.86 -1.46 1.86 -1.33a2.6 2.6 0 0 1 1.37 0.69 2.94 2.94 0 0 1 0.6 0.72c0.08 0.08 0.13 0.22 0 0.33Z" fill="#020202" stroke-width="1"></path><path d="M4.23 17.15a4.47 4.47 0 0 0 -2.18 1.6A3 3 0 0 0 4 23.48c0.28 0.05 1.86 0.39 2.33 0.43a2 2 0 0 0 1.06 -0.19 4 4 0 0 0 2 -3.53 3 3 0 0 0 -2.44 -3.3 5 5 0 0 0 -2.72 0.26Zm-1.7 4.28a2.16 2.16 0 0 1 0.36 -2 3.3 3.3 0 0 1 0.77 -0.72c0.24 0.37 0.46 0.75 0.68 1.13l0.16 0.26 -0.41 0.25c-0.55 0.28 -1.09 0.65 -1.56 1.08Zm2.32 1.48a3.66 3.66 0 0 1 -0.74 -0.1 2.27 2.27 0 0 1 -1.22 -0.76c0.69 -0.36 1.38 -0.7 2.05 -1.07l0.11 -0.06 0.06 0.11a15 15 0 0 0 1.63 2 0.25 0.25 0 0 0 0.12 0.08c-0.17 0.06 -1.61 -0.19 -2.01 -0.2Zm3.54 -2.72a3.36 3.36 0 0 1 -1.08 2.67 0.31 0.31 0 0 0 -0.07 -0.24 20.42 20.42 0 0 1 -1.1 -1.93c-0.06 -0.1 -0.12 -0.2 -0.17 -0.3l0.54 -0.31c0.55 -0.32 1.1 -0.65 1.67 -1a3.19 3.19 0 0 1 0.21 1.11ZM6.74 18a1.64 1.64 0 0 1 1 0.49c-0.56 0.22 -1.12 0.44 -1.66 0.69 -0.24 0.11 -0.46 0.23 -0.69 0.35l-0.06 -0.1a8.9 8.9 0 0 0 -1 -1.13l0.23 -0.09A4.77 4.77 0 0 1 6.74 18Z" fill="#0c6fff" stroke-width="1"></path></g></svg>;
    case 'Life / AD&D': return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="Insurance-Hand-Heart--Streamline-Freehand.svg"><desc>Insurance Hand Heart Streamline Icon: https://streamlinehq.com</desc><g><path d="M19.22 19.62c-0.38 -0.78 -1 -1.39 -1.43 -2.2 -0.26 -0.46 -0.35 -1 -0.56 -1.42a3.19 3.19 0 0 0 -0.46 -0.71 3.56 3.56 0 0 0 -1.12 -0.88 1.6 1.6 0 0 0 -1.25 -0.06 2 2 0 0 0 -1 0.86 2.24 2.24 0 0 0 -0.4 1.25 2.88 2.88 0 0 0 0.26 1.13c0.19 0.45 0.47 0.87 0.69 1.3l0.13 0.89a3.35 3.35 0 0 0 0.61 1.22 2.83 2.83 0 0 0 1 0.89 0.33 0.33 0 0 0 0.45 -0.13 0.32 0.32 0 0 0 -0.14 -0.44 2.1 2.1 0 0 1 -0.71 -0.74 2.55 2.55 0 0 1 -0.37 -1 4.82 4.82 0 0 1 0 -0.66 1.48 1.48 0 0 0 -0.11 -0.45c-0.17 -0.43 -0.39 -0.85 -0.54 -1.29a1.63 1.63 0 0 1 -0.11 -0.73 1.26 1.26 0 0 1 0.2 -0.6 1 1 0 0 1 0.45 -0.35c0.13 0 0.26 0 0.39 0.1a2.5 2.5 0 0 1 0.59 0.51 1.62 1.62 0 0 1 0.28 0.42c0.25 0.48 0.4 1 0.69 1.47 0.44 0.66 1 1.17 1.37 1.77A3.27 3.27 0 0 1 18.7 21a4.28 4.28 0 0 1 0.09 1 5.27 5.27 0 0 1 -0.16 1 0.38 0.38 0 0 0 0.72 0.21 6.15 6.15 0 0 0 0.26 -1.21 4.91 4.91 0 0 0 0 -1.21 3.84 3.84 0 0 0 -0.39 -1.17Z" fill="#020202" fill-rule="evenodd" stroke-width="1"></path><path d="M9.65 13.26a1.3 1.3 0 0 0 0.4 0.54 0.58 0.58 0 0 0 0.26 0.11 4.11 4.11 0 0 0 0.47 0c0.38 0 1.71 0.08 2.27 0.06a1 1 0 0 0 0.79 -0.38 1.63 1.63 0 0 0 0.07 -0.42 4.74 4.74 0 0 0 0 -0.68l-0.15 -1.32 0.56 0.09 0.59 0.09 0.44 0a2.53 2.53 0 0 0 0.46 0 1.45 1.45 0 0 0 0.38 -0.16 0.68 0.68 0 0 0 0.26 -0.47l0 -0.33 0.06 -1a6.87 6.87 0 0 0 0 -0.86 1.22 1.22 0 0 0 -0.18 -0.65 0.59 0.59 0 0 0 -0.51 -0.28c-0.16 0 -0.58 0.09 -0.61 0.09L13.79 8l0.12 -1.53a3.59 3.59 0 0 0 0 -0.67 0.64 0.64 0 0 0 -0.28 -0.41 1 1 0 0 0 -0.23 -0.09 2.15 2.15 0 0 0 -0.44 0h-2.08a3.89 3.89 0 0 0 -0.53 0.09 0.63 0.63 0 0 0 -0.39 0.36 1.55 1.55 0 0 0 -0.06 0.54c0 0.31 0.09 0.65 0.11 0.87l0 0.56 -0.26 0 -0.94 -0.06 -0.48 0a0.93 0.93 0 0 0 -0.45 0.16 1.33 1.33 0 0 0 -0.51 0.71 2.83 2.83 0 0 0 -0.12 0.94l0.11 1.1 0 0.31a0.76 0.76 0 0 0 0.11 0.27 0.92 0.92 0 0 0 0.36 0.31 2.18 2.18 0 0 0 0.56 0.14 3.14 3.14 0 0 0 0.75 0c0.14 0 0.28 -0.05 0.43 -0.07l-0.1 0.8a3 3 0 0 0 0.18 0.93Zm-0.45 -2.69a2.28 2.28 0 0 1 -0.52 -0.1l0 -0.18 0 -0.92c0.08 -0.87 -0.43 -0.75 1.24 -0.92a1.79 1.79 0 0 1 0.4 0 0.36 0.36 0 0 0 0.24 0.09 0.32 0.32 0 0 0 0.32 -0.34l0.12 -1c0 -0.18 0 -0.44 0.06 -0.69l1.3 0 0.63 0L13 8.3a0.37 0.37 0 0 0 0 0.14 0.34 0.34 0 0 0 0.39 0.27l1.94 0.11 0.08 0c-0.05 0.2 -0.14 0.43 -0.15 0.54v0.95l-0.32 0h-1.46l-0.07 0 -0.05 0a0.32 0.32 0 0 0 -0.33 0.32l-0.14 1.82 0 0.25 -2 0h-0.2l0 -0.09a3.92 3.92 0 0 1 -0.06 -0.4l0 -1.13a0.34 0.34 0 0 0 0.06 -0.2 0.41 0.41 0 0 0 -0.15 -0.25 0.34 0.34 0 0 0 -0.3 -0.17 0.33 0.33 0 0 0 -0.23 0.1Z" fill="#0c6fff" fill-rule="evenodd" stroke-width="1"></path><path d="M10.86 21.23a5.55 5.55 0 0 0 0.82 1.12 7.67 7.67 0 0 1 1.19 1.42 0.37 0.37 0 0 0 0.69 -0.29 8.67 8.67 0 0 0 -1.3 -2.39c-0.15 -0.22 -0.3 -0.43 -0.44 -0.65a3 3 0 0 1 -0.36 -0.63 2.34 2.34 0 0 1 -0.08 -0.54 0.77 0.77 0 0 0 0.15 0 0.73 0.73 0 0 0 0.23 -0.13c0.1 -0.09 0.69 -0.69 0.45 -1 -0.12 -0.14 -0.21 -0.14 -0.47 -0.14a1.73 1.73 0 0 0 -0.6 0 0.27 0.27 0 0 0 -0.12 0.06c-1.25 0.83 -0.18 3.13 -0.16 3.17Z" fill="#020202" fill-rule="evenodd" stroke-width="1"></path><path d="M23.23 5.32a5.78 5.78 0 0 0 -0.82 -2.64 5.74 5.74 0 0 0 -2.6 -2.14A7.07 7.07 0 0 0 16.56 0 5.41 5.41 0 0 0 12 2.82 5.4 5.4 0 0 0 7.45 0.06a6.54 6.54 0 0 0 -5.83 2.63 6 6 0 0 0 -0.84 2.63 10.25 10.25 0 0 0 0.43 3.95 16.41 16.41 0 0 0 3.8 6 15.17 15.17 0 0 0 4.69 3.41c0.53 0.23 0.71 -0.37 0.37 -0.68a14.31 14.31 0 0 1 -4.32 -3.46A15.44 15.44 0 0 1 2.4 8.88 9.12 9.12 0 0 1 2 6a5.44 5.44 0 0 1 0.64 -2.67A5.46 5.46 0 0 1 7.41 1c3.92 0.08 4.1 3 4.38 3.11a0.28 0.28 0 0 0 0.22 0 0.26 0.26 0 0 0 0.21 0c0.29 -0.09 0.48 -3 4.39 -3.07a6.34 6.34 0 0 1 2.71 0.6 4.7 4.7 0 0 1 2 1.71A5.41 5.41 0 0 1 22 6a9.61 9.61 0 0 1 -0.34 2.88A30.14 30.14 0 0 1 20 13.62a3.55 3.55 0 0 1 -1.29 1.45 0.39 0.39 0 0 0 -0.14 0.52 0.38 0.38 0 0 0 0.51 0.13A4.32 4.32 0 0 0 20.77 14a30.81 30.81 0 0 0 2 -4.79 10.12 10.12 0 0 0 0.46 -3.89Z" fill="#020202" fill-rule="evenodd" stroke-width="1"></path></g></svg>;
    case 'Accident': return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="Ambulance-Emergency-Car--Streamline-Freehand.svg"><desc>Ambulance Emergency Car Streamline Icon: https://streamlinehq.com</desc><g><path d="M5.23 19.37a0.73 0.73 0 0 0 0.67 0.78 0.77 0.77 0 0 0 0.83 -0.63 0.79 0.79 0 0 0 -0.73 -0.86 0.74 0.74 0 0 0 -0.77 0.71Z" fill="#020202" fill-rule="evenodd" stroke-width="1"></path><path d="M17.69 19.35a0.73 0.73 0 0 0 0.67 0.78 0.76 0.76 0 0 0 0.83 -0.63 0.8 0.8 0 0 0 -0.69 -0.86 0.74 0.74 0 0 0 -0.81 0.71Z" fill="#020202" fill-rule="evenodd" stroke-width="1"></path><path d="m2.36 12.82 1.87 0a1.05 1.05 0 0 0 0.37 0 2.57 2.57 0 0 1 0.29 0.6c0.18 0.48 0.31 1 0.44 1.39a0.48 0.48 0 0 0 0.26 0.28 0.49 0.49 0 0 0 0.39 0 0.4 0.4 0 0 0 0.21 -0.19c0 -0.08 0.12 -0.26 0.16 -0.34l0.4 -0.79c0.14 -0.32 0.26 -0.64 0.37 -1 0.21 -0.67 0.37 -1.35 0.59 -2 0 0.33 0.08 0.68 0.16 1a2.7 2.7 0 0 0 0.36 0.91 1 1 0 0 0 0.54 0.37 3.74 3.74 0 0 0 1 0.15l1.23 -0.09 2 -0.28a0.32 0.32 0 0 0 0.3 -0.34 0.33 0.33 0 0 0 -0.3 -0.29l-2.07 0.17H9.84a4 4 0 0 1 -0.59 -0.08c-0.11 0 -0.24 0 -0.29 -0.12a1.69 1.69 0 0 1 -0.18 -0.6c-0.11 -0.65 -0.11 -1.42 -0.23 -1.9 -0.05 -0.17 -0.1 -0.53 -0.19 -0.76a1 1 0 0 0 -0.2 -0.33 0.53 0.53 0 0 0 -0.66 -0.12 0.65 0.65 0 0 0 -0.29 0.3c0 0.11 -0.06 0.38 -0.11 0.5l-0.35 1 -0.91 3.14 0 0.12a4.51 4.51 0 0 0 -0.29 -0.63 2.51 2.51 0 0 0 -0.5 -0.69 0.45 0.45 0 0 0 -0.26 -0.12l-0.53 0c-0.33 0 -1.61 0.06 -1.93 0.11l-0.21 0c-0.64 0.11 -0.5 0.69 0 0.61Z" fill="#0c6fff" fill-rule="evenodd" stroke-width="1"></path><path d="M23.69 12.49a5.47 5.47 0 0 0 -1.41 -1.88c-0.19 -0.17 -0.38 -0.33 -0.58 -0.48l-0.58 -0.41 -1.88 -1.16c-0.51 -0.29 -1 -0.57 -1.52 -0.84s-1 -0.54 -1.54 -0.79a0.28 0.28 0 0 0 -0.38 0.12 0.28 0.28 0 0 0 0.11 0.37c0.4 0.23 0.79 0.47 1.17 0.71 0.58 0.37 1.14 0.76 1.7 1.15l1.75 1.28 1 0.83a5.61 5.61 0 0 1 0.64 0.67l-1.09 0c-0.54 0 -1.08 0 -1.62 -0.05l-1.62 0 -2.5 0 0 -1c-0.1 -1.36 -0.27 -2.71 -0.41 -4.07l0.51 -0.53a1.36 1.36 0 0 0 0.32 -1.31 1.46 1.46 0 0 0 -1.12 -0.83 8 8 0 0 0 -2.09 -0.2 3.65 3.65 0 0 0 -1.46 0.37 0.94 0.94 0 0 0 -0.54 1.15 1 1 0 0 0 0.16 0.27l-1.33 -0.11c-0.61 0 -1.22 -0.06 -1.84 -0.06s-1.23 0 -1.84 0.09a25.9 25.9 0 0 0 -4.08 0.75 0.32 0.32 0 0 0 -0.41 0.12A5.88 5.88 0 0 0 0.61 8a15.55 15.55 0 0 0 -0.45 2.15A19.23 19.23 0 0 0 0 13.56a36.84 36.84 0 0 0 0.8 5 0.29 0.29 0 0 0 0.31 0.24c0.72 -0.11 0.24 0 1.06 0.14a3 3 0 0 0 0.42 0 2.71 2.71 0 0 0 0.4 0l0.23 -0.05a1 1 0 0 0 0 0.17 2.49 2.49 0 0 0 1 2.38 2.63 2.63 0 0 0 1.22 0.53 2.76 2.76 0 0 0 1.29 -0.17 0.29 0.29 0 0 0 0.18 -0.35 0.29 0.29 0 0 0 -0.35 -0.18 2.2 2.2 0 0 1 -1 0.05 2 2 0 0 1 -0.85 -0.49 1.67 1.67 0 0 1 -0.51 -1.62 1.72 1.72 0 0 1 1 -1.31 2.69 2.69 0 0 1 1 -0.26 1.76 1.76 0 0 1 0.93 0.2A1.64 1.64 0 0 1 8 19.25a2.09 2.09 0 0 1 -0.79 1.67 0.32 0.32 0 0 0 -0.08 0.44 0.33 0.33 0 0 0 0.45 0.08 2.82 2.82 0 0 0 1.22 -2.16A2.52 2.52 0 0 0 7.64 17a2.64 2.64 0 0 0 -1.46 -0.4 3.59 3.59 0 0 0 -1.41 0.32A2.71 2.71 0 0 0 3.56 18L3 17.89l-0.39 0 -0.38 0c-0.3 0 -0.57 0.13 -0.87 0.17a59.85 59.85 0 0 1 -0.25 -7.77 13.53 13.53 0 0 1 0.23 -2.06 4.77 4.77 0 0 1 0.38 -1.13 34.33 34.33 0 0 1 4 -0.31l1.79 0h1.83c1.4 0 2.8 0.06 4.21 0.18a0.31 0.31 0 0 0 0.35 -0.28 0.32 0.32 0 0 0 -0.27 -0.35c-0.71 -0.12 -1.42 -0.23 -2.13 -0.32a1.27 1.27 0 0 1 -0.2 -0.38 0.22 0.22 0 0 1 0.15 -0.31 3.61 3.61 0 0 1 1.13 -0.14 10.75 10.75 0 0 1 1.87 0.12c0.25 0 0.44 0.05 0.51 0.19a0.6 0.6 0 0 1 -0.12 0.56l-0.35 0.48a0.27 0.27 0 0 0 -0.16 0.24l0 7.22c0.06 1 0.08 2 0.13 3 0 0.62 0.06 1.25 0.12 1.87l-0.68 0 -1.88 0 -3 0.14a0.28 0.28 0 1 0 0 0.55c0.8 0.08 1.58 0.25 2.38 0.34a6.08 6.08 0 0 0 0.61 0 11.14 11.14 0 0 0 1.16 0c0.78 -0.07 1.55 -0.19 2.33 -0.25a2.41 2.41 0 0 0 1 1.8 2.63 2.63 0 0 0 1.22 0.53 2.71 2.71 0 0 0 1.28 -0.17 0.28 0.28 0 1 0 -0.16 -0.53 2.2 2.2 0 0 1 -1 0.05 2 2 0 0 1 -0.85 -0.49 1.69 1.69 0 0 1 -0.52 -1.62 1.76 1.76 0 0 1 1 -1.31 2.79 2.79 0 0 1 1 -0.26 1.8 1.8 0 0 1 0.94 0.2 1.66 1.66 0 0 1 0.84 1.46 2.09 2.09 0 0 1 -0.79 1.67 0.32 0.32 0 0 0 0.36 0.52 2.83 2.83 0 0 0 1.23 -2.16l0 -0.17a4 4 0 0 0 0.62 0.17 2.08 2.08 0 0 0 0.76 0c0.3 -0.05 0.58 -0.13 0.88 -0.21a0.35 0.35 0 0 0 0.2 -0.1 0.31 0.31 0 0 0 0.3 -0.32l0.06 -2.36 0 -1.49a5.66 5.66 0 0 0 -0.18 -2.37Zm-1.22 5.78a2.22 2.22 0 0 0 -0.37 0 2.31 2.31 0 0 0 -0.37 0 5.53 5.53 0 0 0 -0.7 0.18A2.5 2.5 0 0 0 20 17a2.64 2.64 0 0 0 -1.46 -0.4 3.59 3.59 0 0 0 -1.41 0.32 2.71 2.71 0 0 0 -1.54 2h-0.31l0.16 -5 0 -1.25c0.66 0.12 1.33 0.26 2 0.33 0.42 0 0.84 0.06 1.25 0.07s0.85 0 1.26 0a22.07 22.07 0 0 0 2.71 -0.36c0 0.06 0.09 0.13 0.12 0.19a4.92 4.92 0 0 1 0.36 1.91l0.05 1.48 0.1 2.13Z" fill="#020202" fill-rule="evenodd" stroke-width="1"></path><path d="M8.66 4.2a0.57 0.57 0 0 0 0.11 0.16 0.44 0.44 0 0 0 0.15 0.12s0.7 0.33 0.87 0.16c0 0 0.22 -0.09 -0.14 -0.87a0.48 0.48 0 0 0 -0.13 -0.16 0.58 0.58 0 0 0 -0.15 -0.11c-0.75 -0.43 -0.85 -0.23 -0.89 -0.18s-0.2 0.21 0.18 0.88Z" fill="#0c6fff" fill-rule="evenodd" stroke-width="1"></path><path d="M13.07 3.59c0.2 0 0.47 -0.61 0.47 -0.63a0.32 0.32 0 0 0 0 -0.14 0.65 0.65 0 0 0 0 -0.13c-0.25 -0.61 -0.39 -0.63 -0.52 -0.63s-0.26 0 -0.48 0.66a0.35 0.35 0 0 0 0 0.14 0.32 0.32 0 0 0 0 0.14s0.32 0.6 0.53 0.59Z" fill="#0c6fff" fill-rule="evenodd" stroke-width="1"></path><path d="M17.1 4.68a0.51 0.51 0 0 0 0.16 -0.09 0.53 0.53 0 0 0 0.12 -0.14c0.4 -0.57 0.42 -0.67 0.31 -0.83s-0.2 -0.24 -0.92 0a0.7 0.7 0 0 0 -0.17 0.09 0.57 0.57 0 0 0 -0.13 0.14c0 0.06 -0.39 0.67 -0.24 0.85s0.86 -0.01 0.87 -0.02Z" fill="#0c6fff" fill-rule="evenodd" stroke-width="1"></path></g></svg>;
    case 'Vision': return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="Glasses-Circle-1--Streamline-Freehand.svg"><desc>Glasses Circle 1 Streamline Icon: https://streamlinehq.com</desc><g><g><path d="M4.08 6.23a0.34 0.34 0 0 0 0.34 -0.34c0 -0.23 0.25 -0.23 0.47 -0.23A5.34 5.34 0 0 1 6.4 6l3.48 1.24a0.3 0.3 0 0 0 0.4 -0.13 0.3 0.3 0 0 0 -0.13 -0.4c-0.55 -0.35 -1.25 -0.84 -2 -1.22a8.37 8.37 0 0 0 -1.5 -0.57 4.93 4.93 0 0 0 -2.22 0 0.94 0.94 0 0 0 -0.72 1 0.34 0.34 0 0 0 0.37 0.31Z" fill="#020202" stroke-width="1"></path><path d="M23.87 14.57a1.07 1.07 0 0 0 -0.72 -0.37 0.9 0.9 0 0 0 -0.4 0l-0.34 0.12a4.73 4.73 0 0 0 -0.36 -1.56 3.73 3.73 0 0 0 -1.38 -1.63 4.59 4.59 0 0 0 -2 -0.72 5.12 5.12 0 0 0 -2.27 0.24 1.15 1.15 0 0 0 -0.13 -0.17 2.1 2.1 0 0 0 -0.22 -0.3 3.15 3.15 0 0 0 -0.36 -0.37A7.25 7.25 0 0 0 15 9.3a11.41 11.41 0 0 0 -1.24 -0.55 0.33 0.33 0 0 0 -0.47 0.1 0.34 0.34 0 0 0 0.11 0.47c0.34 0.3 0.63 0.63 1 0.91a7.54 7.54 0 0 0 0.77 0.47l0.55 0.25a1.86 1.86 0 0 0 -0.2 0.1 3.42 3.42 0 0 0 -1.8 2.81l0 0.21a2.9 2.9 0 0 0 -0.86 -0.85 1.92 1.92 0 0 0 -2.15 0.22 2.76 2.76 0 0 0 -0.43 0.54 0.19 0.19 0 0 1 0 -0.07 0.34 0.34 0 0 0 -0.44 -0.19 0.33 0.33 0 0 0 -0.19 0.44 4 4 0 0 1 -0.87 3.1 3.41 3.41 0 0 1 -3 1.08 3 3 0 0 1 -2.6 -1.64A3.82 3.82 0 0 1 3 13.51a2.63 2.63 0 0 1 1 -1.24 3.81 3.81 0 0 1 1.55 -0.64 3.88 3.88 0 0 1 2.26 0.31 3.21 3.21 0 0 1 1.71 1.47 0.31 0.31 0 0 0 0.38 0.19 0.3 0.3 0 0 0 0.19 -0.38 3.91 3.91 0 0 0 -2 -1.94l-0.29 -0.13 0.07 -0.05L9.76 10l2.06 -1.23 1.65 -1 1.25 -0.71a10.71 10.71 0 0 1 3.19 -1.56 1.46 1.46 0 0 1 1.69 0.79 0.34 0.34 0 0 0 0.46 0.15 0.34 0.34 0 0 0 0.15 -0.44 2.16 2.16 0 0 0 -2.42 -1.34 11.44 11.44 0 0 0 -3.61 1.44l-1.29 0.72 -1.66 1 -2 1.45 -1.73 1.26 -0.5 0.33a4.58 4.58 0 0 0 -3.63 0.56 3.84 3.84 0 0 0 -1.42 1.66 5.21 5.21 0 0 0 -0.33 1.29l-0.2 0c-0.09 0 -1.38 0.06 -1.38 0.46s1 0.72 1.43 0.66l0.13 0a4.75 4.75 0 0 0 0.54 1.82 4 4 0 0 0 3.57 2.13 4.3 4.3 0 0 0 3.64 -1.64 4.89 4.89 0 0 0 0.94 -2.67s0 -0.07 0.06 -0.09l0.32 -0.33a2.07 2.07 0 0 1 0.44 -0.34 1.24 1.24 0 0 1 0.42 -0.15 1.09 1.09 0 0 1 0.95 0.1 10 10 0 0 1 1.1 0.84l0.1 0.07a4.82 4.82 0 0 0 1.15 2.53A4.22 4.22 0 0 0 18.61 19a3.56 3.56 0 0 0 1 -0.25 7.1 7.1 0 0 0 1.27 -0.64 0.3 0.3 0 1 0 -0.31 -0.51 6.59 6.59 0 0 1 -1 0.45 3.4 3.4 0 0 1 -1 0.23 3.48 3.48 0 0 1 -3 -1.16c-0.95 -1.15 -1.52 -3.84 0.48 -5.06a4.14 4.14 0 0 1 2.5 -0.57 3.74 3.74 0 0 1 1.59 0.48 2.81 2.81 0 0 1 1.11 1.18 4 4 0 0 1 0.39 1.79 3.9 3.9 0 0 1 -0.47 1.78 0.34 0.34 0 0 0 0.12 0.46 0.33 0.33 0 0 0 0.46 -0.12 4.28 4.28 0 0 0 0.62 -1.85 2.2 2.2 0 0 0 1.55 -0.12 0.35 0.35 0 0 0 -0.05 -0.52Z" fill="#020202" stroke-width="1"></path></g><path d="M20.93 13.9a2.79 2.79 0 0 0 -1.05 -1.25 3.56 3.56 0 0 0 -1.51 -0.54 4.58 4.58 0 0 0 -0.53 0 0.41 0.41 0 0 0 0 0.82h0.44a2.86 2.86 0 0 1 1.21 0.37 2.15 2.15 0 0 1 0.84 0.9 2.85 2.85 0 0 1 0.24 0.75 0.31 0.31 0 0 0 0.6 -0.14 3.82 3.82 0 0 0 -0.24 -0.91Z" fill="#0c6fff" stroke-width="1"></path></g></svg>;
    case 'Dental': return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="Dentistry-Tooth-Check--Streamline-Freehand.svg"><desc>Dentistry Tooth Check Streamline Icon: https://streamlinehq.com</desc><g><path d="M17 5.69c-0.93 0.9 -1.82 1.8 -2.65 2.77 -0.55 0.66 -1.07 1.34 -1.57 2l-0.95 1.39c-0.19 -0.16 -0.44 -0.3 -0.47 -0.33 -0.55 -0.47 -1.08 -0.93 -1.65 -1.35a10.73 10.73 0 0 0 -1.2 -0.78 0.27 0.27 0 0 0 -0.38 0.08 0.29 0.29 0 0 0 0.09 0.39 9.53 9.53 0 0 1 1.06 0.84c0.51 0.46 1 1 1.45 1.47 0.06 0.07 0.47 0.62 0.67 0.81a0.63 0.63 0 0 0 0.44 0.18 0.59 0.59 0 0 0 0.35 -0.14 4.15 4.15 0 0 0 0.44 -0.49l1 -1.49a28.8 28.8 0 0 1 1.78 -2.54c0.64 -0.83 1.31 -1.63 2 -2.43a0.32 0.32 0 0 0 0 -0.45 0.3 0.3 0 0 0 -0.41 0.07Z" fill="#0c6fff" stroke-width="1"></path><path d="M24 8.53a15.31 15.31 0 0 0 -1.1 -3.89 7.61 7.61 0 0 0 -1.43 -2.38 4.81 4.81 0 0 0 -3.97 -1.21 10.34 10.34 0 0 0 -5.14 2.26A15.45 15.45 0 0 0 9.82 2a6.63 6.63 0 0 0 -2.2 -0.44 7 7 0 0 0 -5.34 2.7A9.42 9.42 0 0 0 0 9.76a6 6 0 0 0 1 3.61c0.88 1.43 2.24 2.6 3.31 4.11 0.69 1 0.76 2.53 1.22 3.77a3.68 3.68 0 0 0 1.08 1.63 0.41 0.41 0 0 0 0.58 0c1 -1.16 1.6 -3.1 2.69 -4.37a3 3 0 0 1 2.74 -1.11 5.72 5.72 0 0 1 3.59 1.39 8.61 8.61 0 0 1 1.87 3.48 0.28 0.28 0 0 0 0.36 0.17 0.27 0.27 0 0 0 0.16 -0.35 9.29 9.29 0 0 0 -2 -3.75 6.28 6.28 0 0 0 -4 -1.62 3.69 3.69 0 0 0 -2.68 0.66c-1.45 1.06 -2.09 3.21 -3.16 4.6a3.29 3.29 0 0 1 -0.5 -1c-0.46 -1.32 -0.55 -2.95 -1.27 -4 -1 -1.52 -2.35 -2.69 -3.21 -4.11a5.16 5.16 0 0 1 -0.8 -3A8.4 8.4 0 0 1 3.09 5 6 6 0 0 1 7.6 2.65 5.92 5.92 0 0 1 9.46 3a16.15 16.15 0 0 1 2.69 1.36 0.51 0.51 0 0 0 0.61 -0.06A9.28 9.28 0 0 1 17.6 2a3.91 3.91 0 0 1 3.21 0.92 8 8 0 0 1 1.5 2.65 13.76 13.76 0 0 1 0.85 3 6.29 6.29 0 0 1 -0.46 3.25c-0.61 1.48 -1.65 2.77 -2.44 4.65a11 11 0 0 0 -0.56 1.9 27.25 27.25 0 0 0 -0.44 2.89 0.31 0.31 0 0 0 0.28 0.34 0.31 0.31 0 0 0 0.34 -0.28 27 27 0 0 1 0.47 -2.8 11.75 11.75 0 0 1 0.54 -1.78c0.82 -1.87 1.88 -3.14 2.51 -4.63a7 7 0 0 0 0.6 -3.58Z" fill="#020202" stroke-width="1"></path></g></svg>;
    case 'Critical Illness/Cancer': return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="Hospital-Bedroom-Graph--Streamline-Freehand.svg"><desc>Hospital Bedroom Graph Streamline Icon: https://streamlinehq.com</desc><g><path d="m9.16 16.28 0.01 0 -0.01 0z" fill="none" stroke-width="1"></path><path d="M14.8 3.19c0 -0.05 -0.05 -0.07 -0.1 0s0.07 -0.01 0.1 0Z" fill="none" stroke-width="1"></path><path d="M17.2 6.6c0.05 0 -0.08 -0.06 -0.11 -0.08 0.01 0.07 0.05 0.11 0.11 0.08Z" fill="none" stroke-width="1"></path><path d="M8.82 16.24a0.34 0.34 0 0 1 0.2 0 0.26 0.26 0 0 0 -0.2 0Z" fill="none" stroke-width="1"></path><path d="M10.07 2.21s0 -0.06 0.06 -0.09 -0.06 0.03 -0.06 0.09Z" fill="none" stroke-width="1"></path><path d="M8.68 16.39v0.05a0.08 0.08 0 0 1 0 -0.06Z" fill="none" stroke-width="1"></path><path d="M18.46 4.68c-0.09 0 -0.14 0 -0.11 0.08s0.08 -0.02 0.11 -0.08Z" fill="none" stroke-width="1"></path><path d="m10.07 2.21 -0.01 0.02 -0.02 0.02 0.03 -0.01 0 -0.01 0 -0.02z" fill="none" stroke-width="1"></path><path d="m0.45 23.46 0 0.08s0.01 -0.04 0 -0.08Z" fill="none" stroke-width="1"></path><path d="m0.91 23.28 0.02 0.01 -0.02 -0.01z" fill="none" stroke-width="1"></path><path d="M0.49 23.37a0.26 0.26 0 0 1 0.14 -0.11 0.27 0.27 0 0 1 0.12 0 0.25 0.25 0 0 0 -0.26 0.11Z" fill="none" stroke-width="1"></path><path d="m0.86 23.26 0.05 0H0.86Z" fill="none" stroke-width="1"></path><path d="M22.66 19.89v-0.79l-2.61 -0.1 -6.15 0c-1.05 -0.05 -2.11 -0.09 -3.17 -0.12s-2.11 -0.06 -3.15 0H4.21L2.62 19l-0.73 0a1.79 1.79 0 0 0 -0.41 0l-0.2 0.05c0 0.5 -0.05 1 -0.06 1.49l-0.09 1.35a8 8 0 0 0 1 0c0.56 -0.05 1.14 -0.12 1.67 -0.18l3.72 -0.23c0.46 -0.05 0.94 -0.07 1.42 -0.08l2.06 0 3 0q1 0 2 0.15c0.67 0.08 1.34 0.12 2 0.14l4.76 0c0 -0.23 -0.07 -0.45 -0.1 -0.67 0.02 -0.37 0.02 -0.75 0 -1.13Z" fill="none" stroke-width="1"></path><path d="M0.45 23.46Z" fill="none" stroke-width="1"></path><path d="M10.07 2.23c0.09 0 0.14 -0.09 0.05 -0.11s0 0.07 -0.06 0.09Z" fill="#0c6fff" stroke-width="1"></path><path d="M10.11 9.94c0.57 0.11 1.46 0 1.86 0a13.86 13.86 0 0 0 2.06 0.16 29.55 29.55 0 0 0 3 -0.18c0.67 -0.06 1.35 0.13 2 0.12a2.56 2.56 0 0 0 0.62 -0.06 17.57 17.57 0 0 0 2.4 -0.14 1.15 1.15 0 0 0 0.95 -0.68 7.11 7.11 0 0 0 0.33 -2c0.08 -1.44 -0.12 -3 -0.13 -4.32a14.12 14.12 0 0 0 -0.1 -1.68 1.8 1.8 0 0 0 -0.38 -0.91 1.17 1.17 0 0 0 -0.72 -0.2c-0.48 0 -1.29 0.09 -1.48 0.07A21.13 21.13 0 0 0 18 0c-1.22 0 -2.43 0.08 -3.68 0.1L11.84 0 11 0.15h-0.45c-0.32 0 -0.41 0.18 -0.38 0.34s0.06 0.33 0.38 0.35H11l0.81 -0.09 2.48 0.14 3.67 0a17.72 17.72 0 0 1 2.39 0.18c0.22 0 1.75 -0.43 1.67 0 0 0 -0.05 0 -0.08 -0.05a2 2 0 0 1 0.1 0.75l0 1.1c0 1.27 0.16 2.84 0.07 4.26a6.31 6.31 0 0 1 -0.26 1.61c0 -0.05 0 -0.1 0.05 -0.07 0.13 0.22 -0.63 0.13 -1 0.14l-1.43 0a2.66 2.66 0 0 1 -0.63 0 12.08 12.08 0 0 0 -1.9 -0.07c-0.94 0.2 -1.94 0.32 -2.94 0.34A12 12 0 0 1 12.11 9c-0.33 0 -0.93 0.06 -1.47 0.08 -0.24 0 -0.46 0 -0.57 -0.07s0.15 0.13 0.08 0.14c-0.25 0 0 -0.84 0 -0.95 0 -0.72 -0.05 -1.46 -0.05 -2.19l0 -1.43 0 -2.06a2.44 2.44 0 0 1 0 -0.3l0 -0.09a0.31 0.31 0 0 0 -0.25 -0.36 0.34 0.34 0 0 0 -0.33 0.23 3.31 3.31 0 0 0 0 0.52l0 2c-0.05 0.49 -0.08 1 -0.09 1.48l0 2.2c0 0.11 -0.07 0.62 -0.06 0.92a0.72 0.72 0 0 0 0.17 0.5 1.11 1.11 0 0 0 0.57 0.32Z" fill="#0c6fff" stroke-width="1"></path><path d="M12.74 5.82a1.41 1.41 0 0 0 0.78 -0.18 0.85 0.85 0 0 0 0.27 -0.29c0.09 -0.16 0.17 -0.37 0.23 -0.49 0.14 -0.29 0.28 -0.6 0.44 -0.9a3.4 3.4 0 0 1 0.31 -0.52 0.35 0.35 0 0 1 0.11 -0.09c0 0.15 0 0.35 0.07 0.43l1 2.62a5.61 5.61 0 0 0 0.31 0.77 0.88 0.88 0 0 0 0.36 0.34 0.73 0.73 0 0 0 0.81 -0.09 1.92 1.92 0 0 0 0.53 -0.76c0.14 -0.45 0.24 -1 0.37 -1.49a4.7 4.7 0 0 1 0.16 -0.49l0.66 0 1.73 -0.21a0.35 0.35 0 1 0 0 -0.69L19 3.9a8.15 8.15 0 0 0 -0.86 0 0.69 0.69 0 0 0 -0.48 0.33 3.64 3.64 0 0 0 -0.28 0.66c-0.14 0.4 -0.26 0.85 -0.4 1.23C17 6.06 17 6 17 6l-1 -2.66a4.79 4.79 0 0 0 -0.32 -0.73 1 1 0 0 0 -0.48 -0.42 0.81 0.81 0 0 0 -0.71 0.07 1.82 1.82 0 0 0 -0.57 0.65 5 5 0 0 0 -0.32 0.66c-0.13 0.31 -0.23 0.64 -0.36 0.95l-0.15 0.48a0.87 0.87 0 0 1 -0.53 0.1c-0.42 0 -0.87 -0.1 -1.19 -0.08a0.3 0.3 0 0 0 0 0.6c0.36 0.02 0.91 0.19 1.37 0.2Zm5.72 -1.14c0 0.06 -0.09 0.14 -0.11 0.08s0.02 -0.08 0.11 -0.08Zm-1.37 1.84s0.16 0.05 0.11 0.08 -0.1 0 -0.12 -0.08ZM14.83 3.2l-0.07 0c0.02 0 0.05 -0.05 0.07 0Z" fill="#020202" stroke-width="1"></path><path d="M0.45 23.44s-0.06 0.11 0 0.1 0 -0.05 0 -0.08Z" fill="#020202" stroke-width="1"></path><path d="m23.77 19.82 -0.27 -1.25 -0.18 -0.86v-0.06c0 -1.3 -0.22 -1.72 -0.42 -1.28 -0.26 -0.44 -0.42 0 -0.19 1.35v0.05l0 0.63 -2.58 -0.21c-0.62 -0.06 -1.24 -0.09 -1.86 -0.12 -1.46 -0.07 -2.89 -0.07 -4.27 -0.16s-2.56 -0.15 -3.85 -0.15c-0.87 0 -1.73 0 -2.59 0.1l-3.37 0.22 -1.53 0.23 -0.87 0a2 2 0 0 0 -0.43 0.07l0 -0.86 -0.13 -3.12a0.35 0.35 0 0 0 -0.34 -0.35 0.35 0.35 0 0 0 -0.35 0.35c0 0.67 -0.15 1.34 -0.22 2.19l0 1 0 2 0 0.9 0.19 2 0.08 0.74a0.43 0.43 0 0 0 0 0.14l0 0.08a0.2 0.2 0 0 0 0 0.11c0.06 0.17 0.59 0.35 0.58 -0.16v-0.1l0 -0.79a9.08 9.08 0 0 0 1 0c0.57 0 1.15 -0.05 1.7 -0.07l3.73 0 3.41 0.06h3c0.65 0 1.31 0 2 0.06s1.4 0.05 2.11 0c1.61 0 3.24 -0.18 4.82 -0.22 0.07 0.42 0.13 0.85 0.17 1.27a0.34 0.34 0 1 0 0.68 0 19.8 19.8 0 0 0 0.12 -2.32c-0.04 -0.46 -0.1 -0.97 -0.14 -1.47ZM0.63 23.26a0.26 0.26 0 0 0 -0.14 0.11 0.25 0.25 0 0 1 0.26 -0.14 0.27 0.27 0 0 0 -0.12 0.03Zm0.23 0h0.05Zm0.05 0Zm17.15 -1.61c-0.68 0 -1.35 -0.06 -2 -0.14s-1.36 -0.13 -2 -0.15l-3 0 -2.06 0c-0.48 0 -1 0 -1.42 0.08l-3.72 0.23c-0.53 0.06 -1.11 0.13 -1.67 0.18a8 8 0 0 1 -1 0l0.09 -1.35c0 -0.49 0 -1 0.06 -1.49l0.2 -0.05a1.79 1.79 0 0 1 0.41 0l0.73 0 1.59 -0.12h3.31l3.15 0c1.06 0 2.12 0.07 3.17 0.12l6.15 0 2.62 0.08v0.79c0 0.38 0 0.76 0.06 1.15 0 0.22 0.06 0.44 0.1 0.67 -1.58 0.02 -3.18 0.07 -4.77 0.02Z" fill="#020202" stroke-width="1"></path><path d="M4.32 17.05a4.35 4.35 0 0 0 2.37 -0.45 2.69 2.69 0 0 0 1.22 -1.25 3.13 3.13 0 0 0 0 -2.6 2.62 2.62 0 0 0 -2.07 -1.5 4.41 4.41 0 0 0 -1 0 2.24 2.24 0 0 0 -0.66 0.18 0.34 0.34 0 0 0 -0.18 0.45 0.34 0.34 0 0 0 0.44 0.19A1.48 1.48 0 0 1 5 12a4.1 4.1 0 0 1 0.65 0.08A1.8 1.8 0 0 1 7 13.15a2.11 2.11 0 0 1 -0.1 1.73 1.79 1.79 0 0 1 -1 0.82 3.57 3.57 0 0 1 -1.47 0.24A1.6 1.6 0 0 1 3 14.63a2 2 0 0 1 0.44 -2.1 0.3 0.3 0 0 0 -0.32 -0.53 2.76 2.76 0 0 0 -0.93 2.78 2.57 2.57 0 0 0 2.13 2.27Z" fill="#020202" stroke-width="1"></path><path d="M8.64 16.45a0.25 0.25 0 0 0 0 0.07l0 0.06 0 0.07a0.25 0.25 0 0 0 0.11 0.12s0.54 0 0.45 -0.35a0.11 0.11 0 0 1 0 -0.05v-0.75a4.53 4.53 0 0 1 0.21 -1.22 0.85 0.85 0 0 1 0.38 -0.47A3.3 3.3 0 0 1 11 13.6a11.88 11.88 0 0 1 1.89 0l3.37 0a12.49 12.49 0 0 1 2.29 0 4.13 4.13 0 0 1 1.35 0.41c0.23 0.12 0.47 0.21 0.69 0.34a1.13 1.13 0 0 1 0.3 0.24 2 2 0 0 1 0.37 0.78 7.11 7.11 0 0 1 0.18 1.51l0 0.7 0 0.08a0.31 0.31 0 0 0 0 0.1 0.34 0.34 0 0 0 0.34 0.34 0.37 0.37 0 0 0 0.22 -0.1 0.9 0.9 0 0 0 0.13 -0.43l0 -0.7a8.44 8.44 0 0 0 -0.13 -1.69 2.8 2.8 0 0 0 -0.45 -1.18 2.4 2.4 0 0 0 -0.5 -0.46c-0.23 -0.15 -0.48 -0.27 -0.72 -0.42a5 5 0 0 0 -1.66 -0.61 12.23 12.23 0 0 0 -2.5 -0.11l-3.33 0.09a11.21 11.21 0 0 0 -2.05 0.16 4.2 4.2 0 0 0 -1.36 0.54 1.64 1.64 0 0 0 -0.69 0.94 5.26 5.26 0 0 0 -0.15 1.45l0 0.66Zm0.52 -0.17ZM9 16.21a0.34 0.34 0 0 0 -0.2 0 0.26 0.26 0 0 1 0.2 0Zm-0.35 0.21a0.08 0.08 0 0 0 0 0.06Z" fill="#020202" stroke-width="1"></path><path d="M8.66 16.58s-0.01 -0.01 0 0Z" fill="#020202" stroke-width="1"></path></g></svg>;
    default: return <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>;
  }
};

interface ProductSelectorProps {
  selectedProduct: Product;
  setSelectedProduct: (product: Product) => void;
  products: Product[];
}

const ProductSelector: React.FC<ProductSelectorProps> = ({ selectedProduct, setSelectedProduct, products }) => {
  const sliderRef = useRef<Slider>(null);
  const [slidesToShow, setSlidesToShow] = useState(4);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  useEffect(() => {
    const updateSlidesToShow = () => {
      if (window.innerWidth >= 1024) {
        setSlidesToShow(products.length);
      } else if (window.innerWidth >= 768) {
        setSlidesToShow(4);
      } else if (window.innerWidth >= 640) {
        setSlidesToShow(3);
      } else {
        setSlidesToShow(2);
      }
    };

    updateSlidesToShow();
    window.addEventListener('resize', updateSlidesToShow);
    return () => window.removeEventListener('resize', updateSlidesToShow);
  }, [products.length]);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        }
      }
    ],
    beforeChange: (current: number, next: number) => {
      setShowLeftArrow(next > 0);
      setShowRightArrow(next < products.length - slidesToShow);
    },
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const ArrowButton = ({ direction, onClick, show }: { direction: 'left' | 'right', onClick: () => void, show: boolean }) => (
    <button
      onClick={onClick}
      className={`absolute top-1/2 transform -translate-y-1/2 ${direction === 'left' ? 'left-0' : 'right-0'} 
                  bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-1 z-10 transition-opacity duration-300
                  ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      aria-label={direction === 'left' ? 'Previous' : 'Next'}
    >
      <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        {direction === 'left' ? (
          <path d="M31.8839 8.36612C32.372 8.85427 32.372 9.64573 31.8839 10.1339L18.0178 24L31.8839 37.8661C32.372 38.3543 32.372 39.1457 31.8839 39.6339C31.3957 40.122 30.6043 40.122 30.1161 39.6339L15.3661 24.8839C14.878 24.3957 14.878 23.6043 15.3661 23.1161L30.1161 8.36612C30.6043 7.87796 31.3957 7.87796 31.8839 8.36612Z" fill="#2D5FF1"/>
        ) : (
          <path d="M16.1161 39.6339C15.628 39.1457 15.628 38.3543 16.1161 37.8661L29.9822 24L16.1161 10.1339C15.628 9.64573 15.628 8.85427 16.1161 8.36612C16.6043 7.87796 17.3957 7.87796 17.8839 8.36612L32.6339 23.1161C33.122 23.6043 33.122 24.3957 32.6339 24.8839L17.8839 39.6339C17.3957 40.122 16.6043 40.122 16.1161 39.6339Z" fill="#2D5FF1"/>
        )}
      </svg>
    </button>
  );
  return (
    <div className="w-full rounded-lg overflow-hidden p-2 relative">
      <h3 className="text-lg font-semibold mb-2">Choose Your Coverage</h3>
      <ArrowButton direction="left" onClick={handlePrev} show={showLeftArrow} />
      <ArrowButton direction="right" onClick={handleNext} show={showRightArrow} />
      <Slider ref={sliderRef} {...settings}>
        {products.map((product) => (
          <div key={product} className="px-0">
            <button
              className={`w-full flex flex-col items-center justify-center p-2 rounded-md transition-colors duration-150 ease-in-out
                ${selectedProduct === product
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:bg-gray-200'
                }`}
              onClick={() => setSelectedProduct(product)}
            >
              <div className={`w-11 h-11 flex items-center justify-center rounded-full mb-2
                ${selectedProduct === product ? 'bg-white text-blue-500' : ' text-blue-500'}`}>
                {getProductIcon(product)}
              </div>
              <span className="text-base text-center whitespace-normal h-10">{product}</span>
            </button>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductSelector;