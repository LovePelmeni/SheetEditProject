FROM --platform=arm64 node:lts 
# Initializing New Work Directory 
WORKDIR /project/dir/ 

# Copying the Project 
COPY . . 
# Installing All the Dependencies
RUN npm install 
# Running Unittests
RUN npm test 

# Running the HTTP Server
ENTRYPOINT ["npm", "run", "serve"]