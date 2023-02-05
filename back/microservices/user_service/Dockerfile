FROM openjdk:11
RUN mkdir -p /app/SP
WORKDIR /app/SP
COPY ./target/user_service-0.0.1-SNAPSHOT.jar user_service-0.0.1-SNAPSHOT.jar
CMD ["java","-jar","user_service-0.0.1-SNAPSHOT.jar"]
