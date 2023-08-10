// Function to show a confirmation dialog before deleting a post
function confirmDelete(postId) {
    const confirmed = confirm('Are you sure you want to delete this post?');
  
    if (confirmed) {
      // Redirect to the delete route if confirmed
      window.location.href = `/dashboard/delete/${postId}`;
    }
  }
  
  // Attach event listeners to delete buttons
  const deleteButtons = document.querySelectorAll('.delete-button');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const postId = event.target.dataset.postId;
      confirmDelete(postId);
    });
  });
  
  console.log('Script loaded');