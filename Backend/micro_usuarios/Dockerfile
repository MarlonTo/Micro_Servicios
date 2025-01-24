# Usa una imagen base de OpenJDK para ejecutar tu aplicación
FROM openjdk:17-jdk-slim

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el archivo pom.xml y el wrapper de Maven
COPY pom.xml ./
COPY .mvn ./.mvn
COPY mvnw ./

# Da permisos de ejecución al archivo mvnw
RUN chmod +x mvnw

# Descarga las dependencias antes de copiar el código fuente
RUN ./mvnw dependency:go-offline

# Copia el código fuente de la aplicación
COPY src ./src

# Construye el archivo JAR
RUN ./mvnw clean package -DskipTests

# Encuentra el nombre del JAR generado
RUN sh -c 'mv target/*.jar app.jar'

# Expone el puerto que tu aplicación usa
EXPOSE 8004

# Comando para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]
