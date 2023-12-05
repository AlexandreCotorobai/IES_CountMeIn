FROM maven:3.8.5-openjdk-17

WORKDIR /backend

COPY . .

RUN mvn install -DskipTests

CMD java -jar target/countmein-0.0.1-SNAPSHOT.jar