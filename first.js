let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
 
menu.onclick = () => {
    navbar.classList.toggle('active');
}
 
window.onscroll = () => {
    navbar.classList.remove('active');
} 
  
  
  function showDetails(product) {
    // Populate the modal with product data
    document.getElementById('modalTitle').textContent = product.name;
    document.getElementById('modalDescription').textContent = product.description;
    document.getElementById('modalPrice').textContent = `Rs ${product.price}`;
    document.getElementById('modalMaterial').textContent = product.material;
    document.getElementById('modalColor').textContent = product.color;
    document.getElementById('modalDimensions').textContent =
      `${product.dimensions.height}x${product.dimensions.width}x${product.dimensions.depth} cm`;
    document.getElementById('modalWeight').textContent = product.weight;
    document.getElementById('modalStock').textContent = product.stock > 0 ? 'In Stock' : 'Out of Stock';
    document.getElementById('modalAssembly').textContent = product.assemblyRequired ? 'Yes' : 'No';
    document.getElementById('modalCare').textContent = product.careInstruction;
    document.getElementById('modalImage').src = product.picture;
    document.getElementById('modalImage').src = product.picture;
  
  
  //   document.getElementById('arLink').href = product.arModel;
  
    // Display reviews
    const reviewsList = document.getElementById('modalReviews');
    reviewsList.innerHTML = '';
    product.reviews.forEach(review => {
      const li = document.createElement('li');
      li.textContent = `${review.userId}: ${review.comment} (${review.rating}/5)`;
      reviewsList.appendChild(li);
    });
  
    // Show the modal
    const modal = document.getElementById('detailsModal');
    modal.style.display = 'flex';
  
    // Disable scrolling and interactions outside the modal
    document.body.classList.add('modal-open');
  }
  
  function closeModal() {
    // Hide the modal
    const modal = document.getElementById('detailsModal');
    modal.style.display = 'none';
  
    // Re-enable scrolling and interactions
    document.body.classList.remove('modal-open');
  }
  
  
          function sendData(name_vr) {
              const data = name_vr // Replace with your data
              window.location.href = `vr.html?message=${encodeURIComponent(data)}`;
          }