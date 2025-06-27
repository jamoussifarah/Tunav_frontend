import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from '../../environments/environment';
import { BlogService } from 'app/Services/BlogService';

export interface Blog {
  id: number;
  titre: string;
  contenu: string;
  imagePath: string;    
  tags: string[];
  likes: number;
}

@Component({
  selector: 'app-blogslist',
  templateUrl: './blogslist.component.html',
  styleUrls: ['./blogslist.component.scss']
})
export class BlogslistComponent implements OnInit {
  blogs: Blog[] = [];
apiBaseUrl = environment.baseUrl;

  constructor(private router: Router, private blogService: BlogService) { }

  ngOnInit() {
    this.loadBlogs();
  }

  loadBlogs() {
    this.blogService.getAllBlogs().subscribe({
      next: (data) => this.blogs = data,
      error: (err) => console.error('Erreur lors du chargement des blogs:', err)
    });
  }

  editBlog(id: number) {
    this.router.navigate(['/update-blog', id]);
    console.log("Edit blog", id);
  }

  confirmDelete(id: number) {
    Swal.fire({
      title: 'Supprimer ce blog ?',
      text: 'Cette action est irréversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        // Ici, idéalement, appeler un service pour supprimer côté backend aussi
        this.blogs = this.blogs.filter(b => b.id !== id);
        Swal.fire('Supprimé !', 'Le blog a été supprimé.', 'success');
      }
    });
  }

  // Méthode utilitaire pour avoir l'URL complète de l'image
  getImageUrl(imagePath: string): string {
    return this.apiBaseUrl + imagePath;
  }
}
