# EigenFlow 官网 | EigenFlow Site

EigenFlow 系统化量化研究与组合构建的单页双语官网，静态站点，适用于 GitHub Pages / Cloudflare Pages 部署。

## 文件结构

```
EigenFlow_site/
├── index.html      # 主页面（含全部区块与中英双语内容）
├── styles.css      # 样式（品牌色、深色/浅色主题、响应式）
├── script.js       # 语言切换、主题切换、平滑滚动、配置注入
├── favicon.svg     # EF 波浪线 logo 图标
└── README.md       # 本说明
```

## 本地预览

- 直接双击 `index.html` 用浏览器打开，或
- 使用本地服务器（推荐，避免部分 API 行为差异）：
  - Python 3: `python -m http.server 8080`，访问 http://localhost:8080
  - Node: `npx serve .` 或 `npx http-server`

站点除「进入研究平台」「邮箱」「eigenflow.cn」等外链外，均可离线使用。

## 配置项（可选）

在 `index.html` 顶部有内联配置，可按需修改：

```javascript
window.EIGENFLOW_CONFIG = {
  DASHBOARD_URL: "https://eigenflow-quant-research.streamlit.app/",
  CONTACT_EMAIL: "research.eigenflow@gmail.com",
  WECHAT_ID: "Always_With_XMJ"
};
```

- `DASHBOARD_URL`: 研究平台（Streamlit）链接，所有「进入平台 / View Dashboard」按钮均指向此处。
- `CONTACT_EMAIL`: 联系邮箱，页脚与联系区块的邮件链接与展示使用。
- `WECHAT_ID`: 微信 ID（可选），在合作/联系区块展示。

## 部署到 GitHub Pages

1. 在 GitHub 新建仓库（如 `eigenflow-site`），将本目录内容推送到该仓库。
2. 仓库设置：**Settings → Pages**：
   - **Source**: Deploy from a branch
   - **Branch**: 选 `main`（或你使用的默认分支），目录选 **/ (root)**
3. 保存后等待构建，站点地址为：`https://<用户名>.github.io/<仓库名>/`
4. 若使用 **GitHub Pages 自定义域名**（如 eigenflow.cn），在 Pages 设置里填 **Custom domain**：`eigenflow.cn`，并勾选 **Enforce HTTPS**。

### 绑定域名 eigenflow.cn（DNS）

在域名服务商处为 eigenflow.cn 添加记录，使域名指向 GitHub Pages：

- **方式 A（推荐）**：CNAME 记录  
  - 主机/名称：`@`（或 `www`，视你是否用 www）  
  - 值/目标：`<用户名>.github.io`  
  - 若用 `www`，再为根域名 `@` 做一条 A 记录到 GitHub 提供的 IP，或再用 CNAME 到 `用户名.github.io`（部分厂商支持 CNAME 到根）。

- **方式 B**：A 记录（根域名）  
  - 在 [GitHub Pages 官方说明](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site) 中查看当前推荐的 IP，一般为：
    - `185.199.108.153`
    - `185.199.109.153`
    - `185.199.110.153`
    - `185.199.111.153`  
  - 在 DNS 中为 `@` 添加 4 条 A 记录指向上述 IP（或按官方文档更新）。

保存 DNS 后，回到 GitHub Pages 的 Custom domain 填 `eigenflow.cn`（或 `www.eigenflow.cn`），等待 SSL 生效即可。

## 部署到 Cloudflare Pages

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**（或 **Upload assets**）。
2. **Connect to Git**：选择仓库，构建设置可设为：
   - Build command: 留空（纯静态）
   - Build output directory: `/` 或 `.`
3. 部署完成后，会得到 `*.pages.dev` 的地址。
4. 绑定 eigenflow.cn：在 **Custom domains** 中添加 `eigenflow.cn`，按提示在 DNS（Cloudflare 或外部）添加 CNAME 到该 Pages 项目给出的域名（如 `xxx.pages.dev`）。

## 功能说明

- **中英切换**：右上角「中 / EN」切换，无刷新，偏好保存在 `localStorage`。
- **深色/浅色**：主题切换按钮在导航栏，偏好保存在 `localStorage`。
- **响应式**：小屏下导航折叠为汉堡菜单。
- **无障碍**：语义化标签、ARIA、焦点样式、键盘可操作。
- **SEO**：`title`、`description`、`lang` 随语言更新；无后端，利于静态索引。

## 免责声明（站点内已展示）

本站及研究平台内容仅供研究与信息展示，不构成任何投资建议或收益承诺；EigenFlow 不提供代客理财或投资咨询服务。详见页面「风险与合规声明」区块。

## 许可与版权

© EigenFlow. 研究仅供交流，不构成投资建议。
