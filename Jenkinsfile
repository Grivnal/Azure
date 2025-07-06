pipeline {
    agent any
    environment {
        DOCKER_HUB_REPO = '<username>/<repository_name>'  // замініть на свій репозиторій Docker Hub
        IMAGE_TAG = "latest"
    }
    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/potapchukdmytro/pd311_dashboard_react_asp.git', branch: 'master'
            }
        }
        stage('Stop') {
            steps {
                script {
                    sh 'docker compose down'
                    
                    def api = "potapchuk22/pv311_api"

                    // Перевірка, чи існує образ
                    def imageExists = sh(script: "docker images -q ${api}", returnStdout: true).trim()

                    if (imageExists) {
                        echo "Image exists, removing..."
                        sh "docker rmi ${api}"
                    } else {
                        echo "Image does not exist."
                    }
                    
                    def react = "potapchuk22/pv311_react"

                    // Перевірка, чи існує образ
                    imageExists = sh(script: "docker images -q ${react}", returnStdout: true).trim()

                    if (imageExists) {
                        echo "Image exists, removing..."
                        sh "docker rmi ${react}"
                    } else {
                        echo "Image does not exist."
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    sh 'docker compose up -d --build' // Запускає оновлені контейнери у фоновому режимі
                }
            }
        }
    }
}