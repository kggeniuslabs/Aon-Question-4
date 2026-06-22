# Start from code-server base image
FROM codercom/code-server:latest

USER root

# Install curl, Node.js, npm
RUN apt-get clean && rm -rf /var/lib/apt/lists/* && \
    apt-get update --fix-missing && \
    apt-get install -y --no-install-recommends curl gnupg ca-certificates && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y --no-install-recommends nodejs && \
    npm install -g npm && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Set working directory inside the container
WORKDIR /home/coder/project

# Copy only the necessary assessment files
COPY . .

# Remove all write permissions for everyone initially
RUN chmod -R a-w /home/coder/project

# Explicitly allow write permissions only for App.css and App.jsx
RUN chmod u+w /home/coder/project/src/App.css \
    && chmod u+w /home/coder/project/src/App.jsx \
    && chmod u+w /home/coder/project/vite.config.js

# Create node_modules directory and allow write access for npm
RUN mkdir -p /home/coder/project/node_modules && \
    chmod u+w /home/coder/project/node_modules

# Allow write access to package-lock.json for npm
RUN chmod u+w /home/coder/project/package-lock.json

# Ensure the project directory itself is not writable to prevent structural changes
RUN chmod 555 /home/coder/project

# Set ownership to root for all files to prevent the coder user from modifying permissions
# Only the specific writable files (App.css, App.jsx, node_modules, package-lock.json) will allow writes
RUN chown -R root:root /home/coder/project && \
    chown coder:coder /home/coder/project/src/App.css && \
    chown coder:coder /home/coder/project/src/App.jsx && \
    chown coder:coder /home/coder/project/vite.config.js && \
    chown -R coder:coder /home/coder/project/node_modules && \
    chown coder:coder /home/coder/project/package-lock.json

USER coder

# Switch to root to adjust permissions for the .vsix file
USER root

# Grant read access to the .vsix file for the coder user
RUN chmod u+r /home/coder/project/vs-code-essentials-0.1.1.vsix && \
    chown coder:coder /home/coder/project/vs-code-essentials-0.1.1.vsix

# Switch back to coder user for installing the extension
USER coder

# Install the custom extension using code-server
RUN /usr/bin/code-server --install-extension /home/coder/project/vs-code-essentials-0.1.1.vsix

USER root

# Delete the .vsix file after installation
RUN rm /home/coder/project/vs-code-essentials-0.1.1.vsix

# Create a custom settings file to disable the Extensions Marketplace and hide the Extensions view
RUN mkdir -p /home/coder/.local/share/code-server && \
    echo '{ \
        "extensionsGallery": { "serviceUrl": "", "itemUrl": "" }, \
    }' > /home/coder/.local/share/code-server/settings.json && \
    chown -R coder:coder /home/coder/.local/share/code-server && \
    chmod 444 /home/coder/.local/share/code-server/settings.json

# Lock down the extensions directory to prevent modifications
RUN chmod -R 555 /home/coder/.local/share/code-server/extensions && \
    chown -R root:root /home/coder/.local/share/code-server/extensions

USER coder

# Optional: Install deps inside the container (for dev use)
# RUN npm install

# Expose ports for code-server instances and React app outputs
EXPOSE 8080 5173