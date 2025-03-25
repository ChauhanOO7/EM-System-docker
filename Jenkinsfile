pipeline{
    agent any
    environment{
        MONGO_URL= credentials('Mongo-url')
        // DOCKER_USER= credentials('docker-user')
        // DOCKER_PAT= credentials('docker-token')
    }
    stages{
        stage('build images for backend and frontend'){
            steps{
                bat 'docker --version'
                bat 'docker build -t dockermeet872/backend ./backend'
                bat 'docker build --build-arg REACT_APP_backendurl = http://backend:8000 -t dockermeet872/frontend ./frontend'
            }
        }
        stage('push images to dockerhub'){
            // steps{
            //     bat 'echo %DOCKER_PAT% | docker login --username %DOCKER_USER% --password-stdin'
            //     bat 'docker push dockermeet872/backend'
            //     bat 'docker push dockermeet872/frontend'
            // }
            steps {
                withCredentials([
                    usernamePassword(credentialsId: 'docker-user', usernameVariable: 'DOCKER_USER', passwordVariable: ''),
                    string(credentialsId: 'docker-token', variable: 'DOCKER_PAT')
                ]) {
                        bat 'echo %DOCKER_PAT% | docker login --username %DOCKER_USER% --password-stdin'

                        // Push images to Docker Hub
                        bat 'docker push dockermeet872/backend'
                        bat 'docker push dockermeet872/frontend'
                    }
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