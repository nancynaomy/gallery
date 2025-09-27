pipeline {
    agent any

    tools {
        nodejs 'nodeJS22'
    }

    triggers {
        githubPush()
    }

    environment { 
        RENDER_WEBHOOK = credentials('render-webhook')   // render webhook
        SLACK_WEBHOOK  = credentials('slackbot-webhook') // slack bot webhook
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

        stage('Deploy to Render') {
            steps {
                sh '''
                  curl -X POST \
                    -H "Content-Type: application/json" \
                    -d '{"clearCache":true}' \
                    $RENDER_WEBHOOK
                '''
            }
        }
    }

    post {
        success {
            sh '''
              curl -X POST -H 'Content-type: application/json' \
                --data '{"text":"Build #${BUILD_NUMBER} for *${JOB_NAME}* succeeded and deployed to Render."}' \
                $SLACK_WEBHOOK
            '''
        }
        failure {
            sh '''
              curl -X POST -H 'Content-type: application/json' \
                --data '{"text":"Build #${BUILD_NUMBER} for *${JOB_NAME}* failed. Please check Jenkins."}' \
                $SLACK_WEBHOOK
            '''
        }
    }
}
