pipeline{
    agent any
    environment{
        MONGO_URL= credentials('Mongo-url')
        DOCKER_USER= credentials('docker-user')
        DOCKER_PAT= credentials('docker-token')
    }
    stages{
        stage('build images for backend and frontend'){
            steps{
                bat 'docker --version'
                bat 'docker build -t dockermeet872/backend ./backend'
                bat 'docker build -t dockermeet872/frontend ./frontend'
            }
        }
        stage('pubat images to dockerhub'){
            steps{
                bat 'echo docker login --username %DOCKER_USER% --password-stdin %DOCKER_PAT%'
                bat 'docker push dockermeet872/backend'
                bat 'docker push dockermeet872/frontend'
            }
        }
        stage('deploy'){
            steps{
                bat 'docker compose up -d'
            }

        }
    }
    post{
        always{
            bat 'docker logout'
        }
        success{
            echo 'Deployment successful!'
        }
    }
}