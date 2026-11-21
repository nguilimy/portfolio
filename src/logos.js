// Official technology logos (Devicon, MIT licence), bundled locally by Vite.
import react from 'devicon/icons/react/react-original.svg'
import python from 'devicon/icons/python/python-original.svg'
import javascript from 'devicon/icons/javascript/javascript-original.svg'
import typescript from 'devicon/icons/typescript/typescript-original.svg'
import nodejs from 'devicon/icons/nodejs/nodejs-original.svg'
import express from 'devicon/icons/express/express-original.svg'
import flask from 'devicon/icons/flask/flask-original.svg'
import fastapi from 'devicon/icons/fastapi/fastapi-original.svg'
import mysql from 'devicon/icons/mysql/mysql-original.svg'
import mongodb from 'devicon/icons/mongodb/mongodb-original.svg'
import firebase from 'devicon/icons/firebase/firebase-original.svg'
import docker from 'devicon/icons/docker/docker-original.svg'
import php from 'devicon/icons/php/php-original.svg'
import c from 'devicon/icons/c/c-original.svg'
import cplusplus from 'devicon/icons/cplusplus/cplusplus-original.svg'
import pandas from 'devicon/icons/pandas/pandas-original.svg'
import scikitlearn from 'devicon/icons/scikitlearn/scikitlearn-original.svg'
import tensorflow from 'devicon/icons/tensorflow/tensorflow-original.svg'
import r from 'devicon/icons/r/r-original.svg'
import githubactions from 'devicon/icons/githubactions/githubactions-original.svg'
import aws from 'devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg'
import azure from 'devicon/icons/azure/azure-original.svg'
import vercel from 'devicon/icons/vercel/vercel-original.svg'
import figma from 'devicon/icons/figma/figma-original.svg'
import tailwind from 'devicon/icons/tailwindcss/tailwindcss-original.svg'
import vite from 'devicon/icons/vitejs/vitejs-original.svg'
import swagger from 'devicon/icons/swagger/swagger-original.svg'
import html from 'devicon/icons/html5/html5-original.svg'
import css from 'devicon/icons/css3/css3-original.svg'
import git from 'devicon/icons/git/git-original.svg'
import numpy from 'devicon/icons/numpy/numpy-original.svg'
import jupyter from 'devicon/icons/jupyter/jupyter-original.svg'

/**
 * name → { src, mono, glow }
 *  mono: logo is black, so it gets inverted in dark mode
 *  glow: brand colour used for the soft halo behind the logo
 */
const L = (src, glow, mono = false) => ({ src, glow, mono })

const logos = {
  react: L(react, '#61dafb'),
  'react native': L(react, '#61dafb'),
  python: L(python, '#ffd43b'),
  javascript: L(javascript, '#f7df1e'),
  typescript: L(typescript, '#3178c6'),
  'node.js': L(nodejs, '#5fa04e'),
  'node.js / express': L(nodejs, '#5fa04e'),
  express: L(express, '#888888', true),
  flask: L(flask, '#888888', true),
  'flask / fastapi': L(fastapi, '#009688'),
  fastapi: L(fastapi, '#009688'),
  mysql: L(mysql, '#00a3c4', true),
  mongodb: L(mongodb, '#47a248'),
  firebase: L(firebase, '#ffca28'),
  docker: L(docker, '#2496ed'),
  php: L(php, '#777bb4'),
  c: L(c, '#659ad2'),
  'c / c++': L(cplusplus, '#659ad2'),
  'c++': L(cplusplus, '#659ad2'),
  pandas: L(pandas, '#e70488', true),
  'scikit-learn': L(scikitlearn, '#f89939'),
  'scikit-learn / ml': L(scikitlearn, '#f89939'),
  tensorflow: L(tensorflow, '#ff6f00'),
  r: L(r, '#276dc3'),
  'github actions': L(githubactions, '#2088ff'),
  aws: L(aws, '#ff9900', true),
  azure: L(azure, '#0089d6'),
  vercel: L(vercel, '#888888', true),
  figma: L(figma, '#a259ff'),
  tailwind: L(tailwind, '#38bdf8'),
  nativewind: L(tailwind, '#38bdf8'),
  vite: L(vite, '#646cff'),
  swagger: L(swagger, '#85ea2d'),
  html: L(html, '#e34f26'),
  css: L(css, '#1572b6'),
  git: L(git, '#f05032'),
  numpy: L(numpy, '#4dabcf'),
  jupyter: L(jupyter, '#f37626'),
}

export const logoFor = (name = '') => logos[name.trim().toLowerCase()] || null
