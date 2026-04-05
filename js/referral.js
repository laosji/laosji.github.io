let referralData = null;
let currentCategory = 'all';
let searchTerm = '';
let isStickyDisabled = false;

async function init() {
    try {
        const response = await fetch('/data/referrals.json');
        referralData = await response.json();
        
        const lastUpdateEl = document.getElementById('lastUpdate');
        if (lastUpdateEl) lastUpdateEl.textContent = referralData.lastUpdate;
        
        renderCategoryNav();
        renderAllCategories();
        
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                searchTerm = e.target.value.toLowerCase();
                renderAllCategories();
            });
        }

        const stickyHeader = document.getElementById('sticky-tools');
        const closeBtn = document.getElementById('closeStickyBtn');

        window.addEventListener('scroll', () => {
            if (isStickyDisabled || !stickyHeader) return;
            if (window.scrollY > 100) {
                stickyHeader.classList.add('is-stuck');
                if (closeBtn) closeBtn.style.display = 'block';
            } else {
                stickyHeader.classList.remove('is-stuck');
                if (closeBtn) closeBtn.style.display = 'none';
            }
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                isStickyDisabled = true;
                stickyHeader.style.position = 'static';
                stickyHeader.classList.remove('is-stuck');
                closeBtn.style.display = 'none';
            });
        }
    } catch (error) {
        console.error('加载数据失败:', error);
    }
}

function renderCategoryNav() {
    const nav = document.getElementById('categoryNav');
    if (!nav) return;
    nav.innerHTML = '';
    
    const allBtn = createNavButton('全部', 'all', true);
    nav.appendChild(allBtn);
    
    referralData.categories.forEach(cat => {
        const btn = createNavButton(`${cat.name} (${cat.items.length})`, cat.id, false);
        nav.appendChild(btn);
    });
}

function createNavButton(text, categoryId, isActive) {
    const btn = document.createElement('button');
    btn.textContent = text;
    btn.className = `nav-btn ${isActive ? 'active' : ''}`;
    btn.onclick = () => switchCategory(categoryId);
    return btn;
}

function switchCategory(categoryId) {
    currentCategory = categoryId;
    renderCategoryNav();
    renderAllCategories();
}

function renderAllCategories() {
    const container = document.getElementById('categorySections');
    const noResults = document.getElementById('noResults');
    if (!container) return;
    
    container.innerHTML = '';
    let hasResults = false;
    
    referralData.categories.forEach(category => {
        if (currentCategory !== 'all' && category.id !== currentCategory) return;
        
        let items = category.items;
        if (searchTerm) {
            items = items.filter(item => 
                item.platform.toLowerCase().includes(searchTerm) ||
                item.bonus.toLowerCase().includes(searchTerm) ||
                (item.activityDescription && item.activityDescription.toLowerCase().includes(searchTerm))
            );
        }
        
        if (items.length === 0) return;
        hasResults = true;
        
        const section = document.createElement('div');
        section.className = 'category-section';
        
        // 调整列宽：邀请码列稍微加宽到 18%
        section.innerHTML = `
            <div class="category-title">
                ${category.name}
            </div>
            <div class="table-container">
                <table class="referral-table">
                    <thead>
                        <tr>
                            <th style="width: 15%">平台</th>
                            <th style="width: 30%">福利 (Bonus)</th>
                            <th style="width: 25%">活动说明</th>
                            <th style="width: 18%">邀请码</th>
                            <th style="width: 12%; text-align: center;">操作</th>
                        </tr>
                    </thead>
                    <tbody id="tbody-${category.id}">
                    </tbody>
                </table>
            </div>
        `;
        
        container.appendChild(section);
        const tbody = document.getElementById(`tbody-${category.id}`);
        items.forEach(item => {
            tbody.appendChild(createTableRow(item));
        });
    });
    
    if (hasResults) {
        noResults.style.display = 'none';
        container.style.display = 'block';
    } else {
        noResults.style.display = 'block';
        container.style.display = 'none';
    }
}

function createTableRow(item) {
    const row = document.createElement('tr');
    const updateTime = item.updatedAt || referralData.lastUpdate;
    
    const isExpired = item.activityDescription && item.activityDescription.includes('有效期至') && 
                      new Date(item.activityDescription.match(/(\d{4}-\d{2}-\d{2})/)?.[0] || '9999-12-31') < new Date();
    
    let expiryText = '长期有效';
    if (item.activityDescription) {
        if (item.activityDescription.includes('有效期至')) {
            const match = item.activityDescription.match(/有效期至(\d{4}-\d{2}-\d{2})/);
            if (match) expiryText = '至 ' + match[1];
        } else if (item.activityDescription.includes('长期有效')) {
            expiryText = '长期有效';
        }
    }

    if (isExpired) row.style.opacity = '0.6';
    
    row.innerHTML = `
        <td>
            <div style="font-weight: bold; font-size: 14px;">${item.platform}</div>
            ${item.hot ? '<span style="color:#ef4444; font-size:12px;">🔥 HOT</span>' : ''}
        </td>
        <td>
            <div class="bonus-cell">
                <div class="bonus-text">${item.bonus}</div>
                <div class="bonus-meta">
                    <div class="meta-row">
                        <span class="badge-check">✅</span>
                        <span>${isExpired ? '已过期' : expiryText}</span>
                    </div>
                    <div class="meta-row">
                        <span style="opacity: 0.6">更新: ${updateTime}</span>
                    </div>
                </div>
            </div>
        </td>
        <td style="font-size: 13px; color: #666; line-height: 1.5;">
            ${item.activityDescription || ''}
        </td>
        <td>
            <div class="invite-group">
                ${item.inviteCode ? `
                    <span class="code-text">${item.inviteCode}</span>
                    <button onclick="copyInviteCode('${item.inviteCode}')" class="btn-copy">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg> 
                        <span>复制</span>
                    </button>
                ` : '<span style="font-size: 12px; color: #999;">无需邀请码</span>'}
            </div>
        </td>
        <td style="vertical-align: middle; text-align: center;">
            <a href="${item.referralLink}" target="_blank" rel="noopener" style="text-decoration: none;">
                <button class="btn-claim">立即领取</button>
            </a>
        </td>
    `;
    return row;
}

function copyInviteCode(code) {
    navigator.clipboard.writeText(code).then(() => showToast('复制成功'))
        .catch(() => alert('复制失败'));
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed; top: 20px; right: 20px; 
        background: #333; color: #fff;
        padding: 10px 20px; border-radius: 4px; 
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        z-index: 100; font-size: 13px;
    `;
    toast.innerHTML = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
}

document.addEventListener('DOMContentLoaded', init);