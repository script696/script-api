import {NestFactory} from "@nestjs/core";const start = async () => {    try {        const app = await NestFactory.create()    } catch {        console.log(e)    }}