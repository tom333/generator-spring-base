
TAG_NAME = <%=appname%>



build: 
	docker build -t ${TAG_NAME} .

run: build
	docker run -p 8080:8080 ${TAG_NAME}

debug: build
	docker run -p 8080:8080 -p 5005:5005 --env JAVA_OPTS=-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005 ${TAG_NAME}
