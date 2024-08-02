#1.0.9环境
FROM 10.200.16.14:60080/customer/nginx:v1.13.12

#1.12环境
#FROM 172.4.2.72:31104/haiguan_base/nginx:v1.21.5-alpine-hg
#FROM 10.200.16.14:60080/customer/nginx:v1.13.12

#XC环境使用这个镜象
#FROM 10.200.65.6:31104/tsf_base/nginx:1.21.5-alpine

ADD ./dist /usr/share/nginx/html

RUN mkdir -p /data/logs/customs

COPY ./nginx.conf /etc/nginx/conf.d

ENV GW_SERVICE ip-apigw

ENV GW_PORT 11000

EXPOSE 8080

CMD ["/usr/sbin/nginx","-g","daemon off;"]
