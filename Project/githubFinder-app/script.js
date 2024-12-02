/*
    #DOMContentLoaded?
    : HTML 문서의 기본적인 DOM구조가
    완전히 로드되고 분석되었을 때 발생하는 이벤트

    # DOMContentLoaded 필요한 이유?
    - 안전한 dom 접근
    - 효율적인 실행 시점
    - 페이지의 성능 최적화
    
*/

// DOMContentLoaded 이벤트 리스너 사용
document.addEventListener('DOMContentLoaded', function() {
    const usernameInput = document.getElementById('usernameInput');
    const viewBtn = document.getElementById('view-btn');
    const profileMain = document.getElementById('profile-main');
    const profileDetails = document.getElementById('profile-details');

    
    usernameInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') { // 엔터 키가 눌렸을 때
            const username = usernameInput.value.trim(); 
            if (username) {
                fetchUserProfile(username); // 사용자 프로필 가져오기 함수 호출
            }
        }
    });

    viewBtn.addEventListener('click', function() {
        const username = usernameInput.value.trim(); // 입력된 사용자 이름 가져오기
        if (username) {
            window.open('https://github.com/' + username, '_blank'); // GitHub 프로필 페이지로 이동
        }
    });

    // 사용자 프로필을 가져오기. 
    // 자바스크립트의 fetch API를 사용해서 GitHub API를 호출
    function fetchUserProfile(username) {
        const url = 'https://api.github.com/users/' + username; // GitHub API URL 생성

        fetch(url)

            //.then(function(response) {...}): 서버로부터 응답을 받았을 때 실행되는 코드
            .then(function(response) {
                // response.ok: 200-299 status code일 때 true
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

    // 프로필 사진을 업데이트하는 함수
    function updateProfile(data) {

        // profileMain 요소 내부의 HTML을 동적으로 설정
        profileMain.innerHTML = `
            <img src="${data.avatar_url}" alt="user-profile" width="200" height="200" style="border-radius: 50%; object-fit: cover;">
            <button id="view-btn" onclick="window.open('${data.html_url}', '_blank')">View Profile</button>
        `;

        profileDetails.innerHTML = `
            <div id="profile-details">
                <span id="company">Company: ${data.company || 'null'}</span>
                <span id="blog">Website/Blog: ${data.blog ? `<a href="${data.blog}" target="_blank">${data.blog}</a>` : 'null'}</span>
                <span id="location">Location: ${data.location || 'null'}</span>
                <span id="since">Member Since: ${new Date(data.created_at).toLocaleDateString()}</span>
            </div>
        `;
    }
});
