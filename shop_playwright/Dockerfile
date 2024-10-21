FROM mcr.microsoft.com/playwright:v1.47.0-jammy

RUN apt-get update && apt-get install -y python3 python3-pip

WORKDIR /shop_playwright

COPY . /shop_playwright

RUN pip3 install -r requirements.txt

CMD ["pytest", "--maxfail=1", "--disable-warnings", "-v"]
