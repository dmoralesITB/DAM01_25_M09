    // Selecciona la imagen por id
    let imagen = document.querySelector('img');
    // Selecciona el párrafo con id 'descripcion'
    let descripcion = document.getElementById('descripcion');

    // Cambia el atributo src a otra foto
    imagen.src = 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=800&auto=format&fit=crop';

    // Actualiza el contenido del párrafo
    descripcion.textContent = 'Imagen actualizada';
