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
            // steps{
            //     bat 'echo %DOCKER_PAT% | docker login --username %DOCKER_USER% --password-stdin'
            //     bat 'docker push dockermeet872/backend'
            //     bat 'docker push dockermeet872/frontend'
            // }
            steps {
                withCredentials([
                    usernamePassword(credentialsId: 'docker-user', usernameVariable: 'DOCKER_USER'),
                    string(credentialsId: 'docker-token', variable: 'DOCKER_PAT')
                ]) {
                    script {
                        // Try logging in with username and password
                        def loginSuccess = false

                        // If username/password fails, try with PAT
                        if (!loginSuccess) {
                            echo "Attempting login with Docker PAT..."
                            bat 'echo %DOCKER_PAT% | docker login --username %DOCKER_USER% --password-stdin'
                        }

                        // Push images to Docker Hub
                        bat 'docker push dockermeet872/backend'
                        bat 'docker push dockermeet872/frontend'
                    }
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