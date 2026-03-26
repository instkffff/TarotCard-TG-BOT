import { createServer } from 'http';
import { parse } from 'url';
import { api } from './api.js';

// 创建HTTP服务器
const server = createServer(async (req, res) => {
  // 设置CORS头部
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');

  // 解析请求URL
  const parsedUrl = parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  // 处理预检请求
  if (method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // 使用导入的api对象处理路由
  if (path.startsWith('/api/') && api[path] && api[path][method]) {
    let body = '';
    
    // 如果是GET请求
    if (method === 'GET') {
      try {
        const result = await api[path][method](); // 使用 await 等待 Promise
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
      }
    } 
    // 如果是POST/PUT/DELETE等带请求体的方法
    else {
      req.on('data', chunk => {
        body += chunk.toString();
      });
      
      req.on('end', async () => { // 添加 async
        try {
          const data = body ? JSON.parse(body) : {};
          const result = await api[path][method](data); // 使用 await 等待 Promise
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(result));
        } catch (error) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: error.message }));
        }
      });
    }
  } else {
    // 404处理
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'API endpoint not found' }));
  }
});

// 导出服务器实例
export { server };