pipeline{
    agent: any
    environment:{
        MONGO_URL: Credentials('Mongo-url')
        DOCKER_USER: Credentials('docker-user')
        DOCKER_PAT: Credentials('docker-token')
    }
    stages:{
        stage('build images for backend and frontend'){
            steps{
                sh 'docker build -t dockermeet872/backend ./backend'
                sh 'docker build -t dockermeet872/frontend ./frontend'
            }
        }
        stage('push images to dockerhub'){
            steps{
                sh 'echo "$DOCKER_PAT" | docker login --username $DOCKER_USER --password-stdin'
                sh 'docker push dockermeet872/backend'
                sh 'docker push dockermeet872/frontend'
            }
        }
        stage('deploy'){
            steps{
                sh 'docker compose u -d'
            }

        }
    }
    post{
        always{
            sh 'docker logout'
        }
        success{
            echo 'Deployment successful!'
        }
    }
}