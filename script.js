document.addEventListener('DOMContentLoaded', function() {
    // 获取所有导航项
    const navItems = document.querySelectorAll('.nav-item');
    
    // 为每个导航项添加点击事件
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // 获取href属性
            const href = this.getAttribute('href');
            
            // 如果是外部链接，则进行跳转
            if (href) {
                // 不阻止默认行为，允许正常跳转
                return;
            }
            
            // 对于没有href的项目（如果有的话），阻止默认行为
            e.preventDefault();
            
            // 移除所有active类
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // 为当前点击项添加active类
            this.classList.add('active');
        });
    });

    // 禁用双指缩放
    document.addEventListener('touchstart', function(event) {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    }, { passive: false });

    // 禁用双击缩放
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);

    // 用户数据
    const users = [
        {
            id: "666888",
            username: "阿阳哥",
            password: "122388",
            phone: "16607791223",
            email: "16607791223@163.com",
            avatar: "https://s1.imagehub.cc/images/2024/11/29/23e80cd31d0fb5b791ed51d81fe26603.jpg"
        },
        {
            id: "000001",
            username: "游客",
            password: "guest123",
            phone: "",
            email: "",
            avatar: "https://s1.imagehub.cc/images/2024/11/08/517863d36cc7513386d28d457636008d.jpeg"
        }
    ];

    // 当前登录用户
    let currentUser = null;

    // 页面加载时检查登录状态
    function checkLoginStatus() {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            currentUser = JSON.parse(savedUser);
            document.querySelector('.avatar-img').src = currentUser.avatar;
        }
    }

    // 页面加载时立即检查登录状态
    checkLoginStatus();

    // 点击头像处理函数
    document.getElementById('avatarContainer').addEventListener('click', () => {
        if (!localStorage.getItem('currentUser')) {
            // 如果未登录，显示登录框
            showLoginDialog();
        } else {
            // 如果已登录，显示用户菜单
            showUserMenu();
        }
    });

    // 显示登录对话框
    function showLoginDialog() {
        const loginModal = document.getElementById('loginModal');
        loginModal.style.display = 'flex';
    }

    // 关闭登录框
    document.getElementById('closeLogin').addEventListener('click', () => {
        document.getElementById('loginModal').style.display = 'none';
    });

    // 点击登录按钮
    document.getElementById('loginBtn').addEventListener('click', () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (!username || !password) {
            alert('请输入用户名和密码');
            return;
        }
        
        login(username, password);
        document.getElementById('loginModal').style.display = 'none';
        // 清空输入框
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
    });

    // 点击模态框外部关闭
    document.getElementById('loginModal').addEventListener('click', (e) => {
        if (e.target.className === 'login-modal') {
            document.getElementById('loginModal').style.display = 'none';
        }
    });

    // 修改登录函数
    function login(username, password) {
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            currentUser = user;
            // 保存登录状态到localStorage
            localStorage.setItem('currentUser', JSON.stringify(user));
            document.querySelector('.avatar-img').src = user.avatar;
            showSuccessModal(`欢迎回来，${user.username}`);
        } else {
            showErrorModal('用户名或密码错误');
        }
    }

    // 添加显示成功弹窗函数
    function showSuccessModal(message) {
        const successModal = document.getElementById('successModal');
        const successMessage = document.getElementById('successMessage');
        successMessage.textContent = message;
        successModal.style.display = 'flex';
    }

    // 添加确认按钮事件监听
    document.getElementById('successConfirmBtn').addEventListener('click', () => {
        document.getElementById('successModal').style.display = 'none';
    });

    // 点击模态框外部关闭
    document.getElementById('successModal').addEventListener('click', (e) => {
        if (e.target.className === 'success-modal') {
            document.getElementById('successModal').style.display = 'none';
        }
    });

    // 修改显示用户菜单函数
    function showUserMenu() {
        document.getElementById('logoutModal').style.display = 'flex';
    }

    // 添加显示错误弹窗函数
    function showErrorModal(message) {
        const errorModal = document.getElementById('errorModal');
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.textContent = message;
        errorModal.style.display = 'flex';
    }

    // 退出登录相关事件监听
    document.getElementById('cancelLogout').addEventListener('click', () => {
        document.getElementById('logoutModal').style.display = 'none';
    });

    document.getElementById('confirmLogout').addEventListener('click', () => {
        currentUser = null;
        // 清除localStorage中的登录状态
        localStorage.removeItem('currentUser');
        document.querySelector('.avatar-img').src = "https://s1.imagehub.cc/images/2024/11/08/517863d36cc7513386d28d457636008d.jpeg";
        document.getElementById('logoutModal').style.display = 'none';
        showSuccessModal('已成功退出登录');
    });

    // 点击模态框外部关闭
    document.getElementById('logoutModal').addEventListener('click', (e) => {
        if (e.target.className === 'confirm-modal') {
            document.getElementById('logoutModal').style.display = 'none';
        }
    });

    // 在原有代码中添加注册相关功能

    // 显示注册弹窗
    document.getElementById('showRegister').addEventListener('click', () => {
        document.getElementById('errorModal').style.display = 'none';
        document.getElementById('registerModal').style.display = 'flex';
    });

    // 关闭注册弹窗
    document.getElementById('closeRegister').addEventListener('click', () => {
        document.getElementById('registerModal').style.display = 'none';
    });

    // 注册按钮点击事件
    document.getElementById('registerBtn').addEventListener('click', () => {
        const username = document.getElementById('regUsername').value;
        const phone = document.getElementById('regPhone').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;

        // 简单的表单验证
        if (!username || !phone || !email || !password) {
            showErrorModal('请填写完整注册信息');
            return;
        }

        // 手机号验证
        if (!/^1[3-9]\d{9}$/.test(phone)) {
            showErrorModal('请输入正确的手机号');
            return;
        }

        // 邮箱验证
        if (!/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(email)) {
            showErrorModal('请输入正确的邮箱地址');
            return;
        }

        // 添加新用户
        users.push({
            username: username,
            password: password,
            phone: phone,
            email: email,
            avatar: "https://s1.imagehub.cc/images/2024/11/08/517863d36cc7513386d28d457636008d.jpeg"
        });

        // 注册成功
        document.getElementById('registerModal').style.display = 'none';
        showSuccessModal('注册成功，请登录');

        // 清空注册表单
        document.getElementById('regUsername').value = '';
        document.getElementById('regPhone').value = '';
        document.getElementById('regEmail').value = '';
        document.getElementById('regPassword').value = '';
    });

    // 点击注册模态框外部关闭
    document.getElementById('registerModal').addEventListener('click', (e) => {
        if (e.target.className === 'register-modal') {
            document.getElementById('registerModal').style.display = 'none';
        }
    });

    // 修复错误确认按钮点击事件
    document.getElementById('errorConfirmBtn').addEventListener('click', () => {
        document.getElementById('errorModal').style.display = 'none';
    });

    // 添加忘记密码相关功能
    document.getElementById('showForgotPassword').addEventListener('click', () => {
        document.getElementById('errorModal').style.display = 'none';
        document.getElementById('resetModal').style.display = 'flex';
    });

    document.getElementById('closeReset').addEventListener('click', () => {
        document.getElementById('resetModal').style.display = 'none';
    });

    // 验证码倒计时功能
    let countdown = 60;
    let timer = null;

    function startCountdown(button) {
        button.disabled = true;
        button.textContent = `${countdown}秒后重新获取`;
        
        timer = setInterval(() => {
            countdown--;
            button.textContent = `${countdown}秒后重新获取`;
            
            if (countdown <= 0) {
                clearInterval(timer);
                button.disabled = false;
                button.textContent = '获取验证码';
                countdown = 60;
            }
        }, 1000);
    }

    // 修改发送验证的处理函数
    document.getElementById('sendCodeBtn').addEventListener('click', function() {
        const username = document.getElementById('resetUsername').value;
        const phone = document.getElementById('resetPhone').value;
        
        if (!username || !phone) {
            showErrorModal('请输入用户名和手机号');
            return;
        }
        
        // 验证用户名和手机号是否匹配
        const user = users.find(u => u.username === username && u.phone === phone);
        if (!user) {
            showErrorModal('用户名或手机号不正确');
            return;
        }
        
        // 显示验证码发送成功弹窗
        document.getElementById('codeSuccessModal').style.display = 'flex';
        startCountdown(this);
    });

    // 添���验证码确认按钮点击事件
    document.getElementById('codeConfirmBtn').addEventListener('click', () => {
        document.getElementById('codeSuccessModal').style.display = 'none';
    });

    // 点击验证码成功弹窗外部关闭
    document.getElementById('codeSuccessModal').addEventListener('click', (e) => {
        if (e.target.className === 'code-success-modal') {
            document.getElementById('codeSuccessModal').style.display = 'none';
        }
    });

    // 重置密码
    document.getElementById('resetBtn').addEventListener('click', () => {
        const username = document.getElementById('resetUsername').value;
        const phone = document.getElementById('resetPhone').value;
        const code = document.getElementById('resetCode').value;
        const newPassword = document.getElementById('resetPassword').value;
        
        if (!username || !phone || !code || !newPassword) {
            showErrorModal('请填写完整信息');
            return;
        }
        
        // 验证用户名和手机号是否匹配
        const userIndex = users.findIndex(u => u.username === username && u.phone === phone);
        if (userIndex === -1) {
            showErrorModal('用户名或手机号不正确');
            return;
        }
        
        // 这里简单验证验证码为123456
        if (code !== '123456') {
            showErrorModal('验证码错误');
            return;
        }
        
        // 更新密码
        users[userIndex].password = newPassword;
        
        // 重置成功
        document.getElementById('resetModal').style.display = 'none';
        showSuccessModal('密码重置成功，请使用新密码登录');
        
        // 清空表单
        document.getElementById('resetUsername').value = '';
        document.getElementById('resetPhone').value = '';
        document.getElementById('resetCode').value = '';
        document.getElementById('resetPassword').value = '';
    });

    // 点击重置模态框外部关闭
    document.getElementById('resetModal').addEventListener('click', (e) => {
        if (e.target.className === 'reset-modal') {
            document.getElementById('resetModal').style.display = 'none';
        }
    });

    // 更新个人页面信息
    function updateProfilePage() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            document.getElementById('profileAvatar').src = currentUser.avatar;
            document.getElementById('profileUsername').textContent = currentUser.username;
            document.getElementById('profileId').textContent = `ID: ${currentUser.id || '--'}`;
        } else {
            document.getElementById('profileAvatar').src = "https://s1.imagehub.cc/images/2024/11/08/517863d36cc7513386d28d457636008d.jpeg";
            document.getElementById('profileUsername').textContent = '未登录';
            document.getElementById('profileId').textContent = 'ID: --';
        }
    }

    // 编辑资料
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
        updateProfilePage();
        
        document.getElementById('editProfileModal').style.display = 'none';
        showSuccessModal('资料修改成功');
    });

    // 陪玩认证
    document.getElementById('verifyPlaymateBtn').addEventListener('click', () => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            showErrorModal('请先登录');
            return;
        }
        
        document.getElementById('verifyModal').style.display = 'flex';
    });

    // 提交认证
    document.getElementById('submitVerifyBtn').addEventListener('click', () => {
        const realName = document.getElementById('realName').value;
        const phone = document.getElementById('verifyPhone').value;
        const gameTypes = document.getElementById('gameTypes').value;
        const serviceTime = document.getElementById('serviceTime').value;
        const hourlyRate = document.getElementById('hourlyRate').value;
        
        if (!realName || !phone || !gameTypes || !serviceTime || !hourlyRate) {
            showErrorModal('请填写完整信息');
            return;
        }
        
        // 这里可以添加认证信息的保存逻辑
        document.getElementById('verifyModal').style.display = 'none';
        showSuccessModal('认证申请提交成功，请等待审核');
    });

    // 关闭弹窗
    document.getElementById('closeEditProfile').addEventListener('click', () => {
        document.getElementById('editProfileModal').style.display = 'none';
    });

    document.getElementById('closeVerify').addEventListener('click', () => {
        document.getElementById('verifyModal').style.display = 'none';
    });
}); 