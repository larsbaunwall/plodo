FROM mcr.microsoft.com/dotnet/core/sdk:3.0 AS build-env
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY ./*.sln .

# Move src projects
COPY ./*/*.csproj ./
RUN for file in $(ls *.csproj); do mkdir -p ./${file%.*}/ && mv $file ./${file%.*}/; done
RUN dotnet restore

# Copy everything else and build
COPY . ./
#RUN dotnet test ./plodo.Backend.sln -l trx -r /testsresults --no-restore
RUN dotnet publish ./plodo.Backend.API/plodo.Backend.API.csproj -o /app/out

# Build runtime image
FROM mcr.microsoft.com/dotnet/core/aspnet:2.2
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "plodo.Backend.API.dll"]