                                 # Usa la imagen oficial de Node.js
FROM node:16

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Expone el puerto en el que correrá tu aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
                                                                                                                                                                                                                                                                                                                                                                                                     