// DOMContentLoaded 이벤트 리스너 사용 -> dom 트리 생성
document.addEventListener('DOMContentLoaded', function() {
    const usernameInput = document.getElementById('usernameInput');
    const viewBtn = document.getElementById('view-btn');
    const profileMain = document.querySelector('.profile-main');
    const profileInfo = document.getElementById('profile-info');
    const reposSection = document.getElementById('repos-section');

    
    usernameInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') { 
            const username = usernameInput.value.trim(); 
            if (username) {
                fetchUserProfile(username); 
                fetchUserRepos(username); 
            }
        }
    });

    viewBtn.addEventListener('click', function() {
        const username = usernameInput.value.trim(); 
        if (username) {
            window.open('https://github.com/' + username, '_blank'); 
        }
    });

    // 자바스크립트의 fetch API를 사용해서 GitHub API를 호출
    function fetchUserProfile(username) {
        const url = 'https://api.github.com/users/' + username; // GitHub API URL 생성

        fetch(url)
            //.then(function(response) {...}): 서버로부터 응답을 받았을 때 실행되는 코드
            .then(function(response) {
                // response.ok: 200-299 응답상태코드일 때 true
                if (!response.ok) {
                    throw new Error('Not found'); // 사용자 정보를 찾을 수 없을 때 오류 발생
                }

                // 응답 데이터를 JSON 형식으로 변환
                return response.json();
            })
            .then(function(data) {
                updateProfile(data); // 프로필 업데이트 함수 호출
            })
            .catch(function(error) {
                console.error(error);
                alert('Not found'); // 사용자 정보를 찾을 수 없을 때 경고 메시지
            });
    }

    // 사용자 리포지토리를 가져오기
    function fetchUserRepos(username) {
        const url = 'https://api.github.com/users/' + username + '/repos?sort=created'; // GitHub 사용자 리포지토리 URL 생성

        fetch(url)
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Repositories not found'); // 리포지토리를 찾을 수 없을 때 오류 발생
                }
                return response.json();
            })
            .then(function(data) {
                updateReposSection(data); // 리포지토리 업데이트 함수 호출
            })
            .catch(function(error) {
                console.error(error);
                alert('Repositories not found'); // 리포지토리를 찾을 수 없을 때 경고 메시지
            });
    }

    //데이터 렌더링(updateProfile, updateReposSection)
    // 프로필 업데이트하는 함수
    function updateProfile(data) {

        // profile 요소 내부의 HTML을 동적으로 설정
        profileMain.innerHTML = `
            <img src="${data.avatar_url}" alt="user-profile" width="200" height="200" style="border-radius: 50%; object-fit: cover;">
            <button id="view-btn" onclick="window.open('${data.html_url}', '_blank')">View Profile</button>
        `;

        profileInfo.innerHTML = `
            <div class="profile-info-btn">
                <button id="publicRepos-btn">Public Repos: ${data.public_repos}</button>
                <button id="publicGists-btn">Public Gists: ${data.public_gists}</button>
                <button id="followers-btn">Followers: ${data.followers}</button>
                <button id="following-btn">Following: ${data.following}</button>
            </div>
            <div class="profile-info-details">
                <span id="company">Company: ${data.company || 'null'}</span>
                <span id="blog">Website/Blog: ${data.blog ? `<a href="${data.blog}" target="_blank">${data.blog}</a>` : 'null'}</span>
                <span id="location">Location: ${data.location || 'null'}</span>
                <span id="since">Member Since: ${new Date(data.created_at).toLocaleDateString()}</span>
            </div>
        `;
    }

    // for문으로 바꿔보기
    function updateReposSection(repos) {
        reposSection.innerHTML = ''; // 기존 내용 초기화

        repos.forEach(function(repo) {
            const repoElement = document.createElement('div');
            repoElement.classList.add('repos-list');

            repoElement.innerHTML = `
                <a id="repos-title" href="${repo.html_url}" target="_blank">${repo.name}</a>
                <div>
                    <button id="stars-btn">Stars: ${repo.stargazers_count}</button>
                    <button id="watchers-btn"> Watchers: ${repo.watchers_count}</button>
                    <button id="forks-btn">Forks: ${repo.forks_count}</button>
                </div>
            `;
            
            reposSection.appendChild(repoElement);
        });
    }
});
