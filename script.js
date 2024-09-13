document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('post-form');
    const postTitle = document.getElementById('post-title');
    const postContent = document.getElementById('post-content');
    const postsContainer = document.getElementById('posts-container');

    // Load posts from localStorage on page load
    loadPosts();

    // Handle form submission
    postForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get values from the form
        const title = postTitle.value;
        const content = postContent.value;

        // Create a new post object
        const post = {
            title,
            content,
            date: new Date().toLocaleDateString()
        };

        // Save post to localStorage
        savePost(post);

        // Clear form inputs
        postTitle.value = '';
        postContent.value = '';

        // Reload posts
        loadPosts();
    });

    function savePost(post) {
        // Get existing posts from localStorage
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        // Add new post to the array
        posts.push(post);
        // Save updated array to localStorage
        localStorage.setItem('posts', JSON.stringify(posts));
    }

    function loadPosts() {
        // Clear existing posts
        postsContainer.innerHTML = '';

        // Get posts from localStorage
        const posts = JSON.parse(localStorage.getItem('posts')) || [];

        // Display each post
        posts.forEach((post, index) => {
            const article = document.createElement('article');
            article.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                <small>${post.date}</small>
                <button class="delete-button" data-index="${index}">Delete</button>
            `;
            postsContainer.appendChild(article);
        });

        // Attach event listeners to delete buttons
        const deleteButtons = document.querySelectorAll('.delete-button');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                deletePost(index);
            });
        });
    }

    function deletePost(index) {
        // Get existing posts from localStorage
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        // Remove post at specified index
        posts.splice(index, 1);
        // Save updated array to localStorage
        localStorage.setItem('posts', JSON.stringify(posts));
        // Reload posts
        loadPosts();
    }
});
