pipeline {
  pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'echo "Building project..."'
            }
        }

        stage('Deploy to Render') {
            steps {
                sh 'node server.js &'
            }
        }
    }
}

