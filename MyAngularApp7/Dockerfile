# Stage 1: Build Angular application
FROM node:18-alpine as angular-build
WORKDIR /app
COPY ClientApp/package*.json ./
RUN npm install
COPY ClientApp/ .
RUN npm run build -- --configuration production

# Stage 2: Build .NET application
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["MyAngularApp7.csproj", "./"]
RUN dotnet restore "MyAngularApp7.csproj"
COPY . .
WORKDIR "/src"
RUN dotnet build "MyAngularApp7.csproj" -c Release -o /app/build

# Stage 3: Publish .NET application
FROM build AS publish
WORKDIR "/src"
RUN dotnet publish "MyAngularApp7.csproj" -c Release -o /app/publish

# Stage 4: Final runtime image
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS final
WORKDIR /app
EXPOSE 80
EXPOSE 443

# Install MySQL client for database migrations
RUN apt-get update && apt-get install -y default-mysql-client && rm -rf /var/lib/apt/lists/*

# Copy the published application
COPY --from=publish /app/publish .
# Copy the built Angular application
COPY --from=angular-build /app/dist/ClientApp ./wwwroot

# Set environment variables
ENV ASPNETCORE_URLS=http://+:80
ENV ASPNETCORE_ENVIRONMENT=Production

# Create a non-root user
RUN adduser --disabled-password --gecos '' appuser && chown -R appuser /app
USER appuser

ENTRYPOINT ["dotnet", "MyAngularApp7.dll"] 