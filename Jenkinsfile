pipeline {
    agent any

    environment { 
         DOCKER_IMAGE = "naomano/gallery"
        DOCKER_CREDENTIALS = "dockerhub-credentials"
        RENDER_API_KEY = credentials('render-api-key')
        }
    }
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/nancynaomy/gallery.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build || echo "No build step"'
            }
        }

        stage('Docker Build & Push') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', DOCKER_CREDENTIALS) {
                        def app = docker.build("${DOCKER_IMAGE}:${env.BUILD_NUMBER}")
                        app.push()
                        app.push("latest")
                    }
                }
            }
        }

        stage('Deploy to Render') {
            steps {
                sh '''
                  curl -X POST \
                    -H "Authorization: Bearer $RENDER_API_KEY" \
                    -H "Content-Type: application/json" \
                    -d '{"clearCache":true}' \
                    https://api.render.com/v1/services/YOUR_RENDER_SERVICE_ID/deploys
                '''
            }
        }
    }

    triggers {
        githubPush()
    }
}
