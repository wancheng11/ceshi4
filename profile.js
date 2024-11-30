document.addEventListener('DOMContentLoaded', function() {
    // 添加必要的辅助函数
    function showErrorModal(message) {
        const errorModal = document.getElementById('errorModal');
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.textContent = message;
        errorModal.style.display = 'flex';
    }

    function showSuccessModal(message) {
        const successModal = document.getElementById('successModal');
        const successMessage = document.getElementById('successMessage');
        successMessage.textContent = message;
        successModal.style.display = 'flex';
    }

    function showLoginDialog() {
        document.getElementById('loginModal').style.display = 'flex';
    }

    // 三横线菜单点击事件
    document.getElementById('menuBtn').addEventListener('click', () => {
        document.getElementById('settingsModal').style.display = 'flex';
    });

    // 关闭设置菜单
    document.getElementById('closeSettings').addEventListener('click', () => {
        document.getElementById('settingsModal').style.display = 'none';
    });

    // 点击设置菜单外部关闭
    document.getElementById('settingsModal').addEventListener('click', (e) => {
        if (e.target.className === 'settings-modal') {
            document.getElementById('settingsModal').style.display = 'none';
        }
    });

    // 设置菜单项点击事件
    document.getElementById('editProfileItem').addEventListener('click', () => {
        document.getElementById('settingsModal').style.display = 'none';
        // 显示编辑资料弹窗
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            showErrorModal('请先登录');
            return;
        }
        document.getElementById('editProfileModal').style.display = 'flex';
    });

    document.getElementById('clearCacheItem').addEventListener('click', () => {
        // 模拟清理缓存
        setTimeout(() => {
            showSuccessModal('缓存清理成功');
            document.getElementById('settingsModal').style.display = 'none';
        }, 1000);
    });

    document.getElementById('checkUpdateItem').addEventListener('click', () => {
        // 模拟检查更新
        setTimeout(() => {
            showSuccessModal('当前已是最新版本');
            document.getElementById('settingsModal').style.display = 'none';
        }, 1000);
    });

    document.getElementById('aboutUsItem').addEventListener('click', () => {
        showSuccessModal('趣玩星球 V1.0.0');
        document.getElementById('settingsModal').style.display = 'none';
    });

    document.getElementById('accountSecurityItem').addEventListener('click', () => {
        document.getElementById('settingsModal').style.display = 'none';
        showSuccessModal('账号安全功能开发中');
    });

    // 检查登录状态并更新页面信息
    function checkLoginStatus() {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            const currentUser = JSON.parse(savedUser);
            document.getElementById('profileAvatar').src = currentUser.avatar;
            document.getElementById('profileUsername').textContent = currentUser.username;
            document.getElementById('profileId').textContent = `ID: ${currentUser.id || '--'}`;
            
            // 判断是否是会员（这里以阿阳哥为会员示例）
            if (currentUser.username === "阿阳哥") {
                document.getElementById('profileUsername').classList.add('vip-username');
                document.getElementById('memberBadge').classList.remove('inactive');
            } else {
                document.getElementById('profileUsername').classList.remove('vip-username');
                document.getElementById('memberBadge').classList.add('inactive');
            }
        } else {
            // 如果未登录，跳转到登录页面或显示登录弹窗
            showLoginDialog();
        }
    }

    // 页面加载时立即检查登录状态
    checkLoginStatus();

    // 编辑资料按钮点击事件
    document.getElementById('editProfileBtn').addEventListener('click', () => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            showErrorModal('请先登录');
            return;
        }
        
        document.getElementById('currentAvatar').src = currentUser.avatar;
        document.getElementById('editUsername').value = currentUser.username;
        document.getElementById('editPhone').value = currentUser.phone;
        document.getElementById('editEmail').value = currentUser.email;
        
        document.getElementById('editProfileModal').style.display = 'flex';
    });

    // 保存资料修改
    document.getElementById('saveProfileBtn').addEventListener('click', () => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) return;
        
        currentUser.username = document.getElementById('editUsername').value;
        currentUser.phone = document.getElementById('editPhone').value;
        currentUser.email = document.getElementById('editEmail').value;
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        checkLoginStatus(); // 更新页面显示
        
        document.getElementById('editProfileModal').style.display = 'none';
        showSuccessModal('资料修改成功');
    });

    // 陪玩认证按钮点击事件
    document.getElementById('verifyPlaymateBtn').addEventListener('click', () => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            showErrorModal('请先登录');
            return;
        }
        
        document.getElementById('verifyModal').style.display = 'flex';
    });

    // 点击钱包余额显示钱包弹窗
    document.querySelector('.assets-item').addEventListener('click', () => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            showErrorModal('请先登录');
            return;
        }
        
        // 更新钱包余额显示
        document.getElementById('modalWalletBalance').textContent = 
            document.getElementById('walletBalance').textContent;
        document.getElementById('availableAmount').textContent = 
            document.getElementById('walletBalance').textContent;
        
        document.getElementById('walletModal').style.display = 'flex';
    });

    // 关闭钱包弹窗
    document.getElementById('closeWallet').addEventListener('click', () => {
        document.getElementById('walletModal').style.display = 'none';
    });

    // 充值按钮点击事件
    document.getElementById('rechargeBtn').addEventListener('click', () => {
        document.getElementById('walletModal').style.display = 'none';
        document.getElementById('rechargeModal').style.display = 'flex';
    });

    // 关闭充值弹窗
    document.getElementById('closeRecharge').addEventListener('click', () => {
        document.getElementById('rechargeModal').style.display = 'none';
        document.getElementById('walletModal').style.display = 'flex';
    });

    // 提现按钮点击事件
    document.getElementById('withdrawBtn').addEventListener('click', () => {
        document.getElementById('walletModal').style.display = 'none';
        document.getElementById('withdrawModal').style.display = 'flex';
    });

    // 关闭提现弹窗
    document.getElementById('closeWithdraw').addEventListener('click', () => {
        document.getElementById('withdrawModal').style.display = 'none';
        document.getElementById('walletModal').style.display = 'flex';
    });

    // 充值金额选择
    document.querySelectorAll('.amount-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('custom')) {
                document.querySelector('.custom-amount').style.display = 'block';
            } else {
                document.querySelector('.custom-amount').style.display = 'none';
                document.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // 确认充值
    document.getElementById('confirmRechargeBtn').addEventListener('click', () => {
        let amount = document.querySelector('.amount-btn.active')?.dataset.amount;
        if (!amount) {
            amount = document.getElementById('customAmount').value;
        }
        
        if (!amount || amount <= 0) {
            showErrorModal('请选择或输入正确的充值金额');
            return;
        }
        
        // 模拟充值成功
        setTimeout(() => {
            document.getElementById('rechargeModal').style.display = 'none';
            showSuccessModal('充值成功');
            
            // 更新余额显示
            const currentBalance = parseFloat(document.getElementById('walletBalance').textContent.replace('￥', ''));
            const newBalance = currentBalance + parseFloat(amount);
            document.getElementById('walletBalance').textContent = `￥${newBalance.toFixed(2)}`;
        }, 1000);
    });

    // 确认提现
    document.getElementById('confirmWithdrawBtn').addEventListener('click', () => {
        const amount = document.getElementById('withdrawAmount').value;
        const currentBalance = parseFloat(document.getElementById('walletBalance').textContent.replace('￥', ''));
        
        if (!amount || amount <= 0) {
            showErrorModal('请输入正确的提现金额');
            return;
        }
        
        if (amount > currentBalance) {
            showErrorModal('提现金额不能大于可用余额');
            return;
        }
        
        // 模拟提现成功
        setTimeout(() => {
            document.getElementById('withdrawModal').style.display = 'none';
            showSuccessModal('提现申请已提交，请等待审核');
            
            // 更新余额显示
            const newBalance = currentBalance - parseFloat(amount);
            document.getElementById('walletBalance').textContent = `￥${newBalance.toFixed(2)}`;
        }, 1000);
    });

    // 点击模态框外部关闭
    document.getElementById('walletModal').addEventListener('click', (e) => {
        if (e.target.className === 'wallet-modal') {
            document.getElementById('walletModal').style.display = 'none';
        }
    });

    document.getElementById('rechargeModal').addEventListener('click', (e) => {
        if (e.target.className === 'recharge-modal') {
            document.getElementById('rechargeModal').style.display = 'none';
        }
    });

    document.getElementById('withdrawModal').addEventListener('click', (e) => {
        if (e.target.className === 'withdraw-modal') {
            document.getElementById('withdrawModal').style.display = 'none';
        }
    });
}); 