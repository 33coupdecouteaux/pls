"use client"

import React, { useState } from "react"
import { IconPlus, IconDeviceFloppy, IconEye, IconTrash, IconEdit } from "@tabler/icons-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  status: "draft" | "published" | "scheduled"
  category: string
  createdAt: Date
  publishedAt?: Date
}

const BlogBuilder = () => {
  const [posts, setPosts] = useState<BlogPost[]>([])

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    status: "draft" as BlogPost["status"],
  })

  const handleCreatePost = () => {
    const newPost: BlogPost = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date(),
      publishedAt: formData.status === "published" ? new Date() : undefined,
    }
    setPosts([newPost, ...posts])
    setFormData({ title: "", excerpt: "", content: "", category: "", status: "draft" })
    setIsCreateModalOpen(false)
  }

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post)
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      status: post.status,
    })
  }

  const handleUpdatePost = () => {
    if (!editingPost) return
    
    const updatedPost: BlogPost = {
      ...editingPost,
      ...formData,
      publishedAt: formData.status === "published" && !editingPost.publishedAt ? new Date() : editingPost.publishedAt,
    }
    
    setPosts(posts.map(post => post.id === editingPost.id ? updatedPost : post))
    setEditingPost(null)
    setFormData({ title: "", excerpt: "", content: "", category: "", status: "draft" })
  }

  const handleDeletePost = (id: string) => {
    setPosts(posts.filter(post => post.id !== id))
  }

  const getStatusColor = (status: BlogPost["status"]) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "draft":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
      case "scheduled":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const PostForm = ({ isEdit = false }: { isEdit?: boolean }) => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="title">Titre</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Titre de l'article..."
        />
      </div>
      
      <div>
        <Label htmlFor="excerpt">Extrait</Label>
        <Textarea
          id="excerpt"
          value={formData.excerpt}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, excerpt: e.target.value })}
          placeholder="Court résumé de l'article..."
          rows={2}
        />
      </div>
      
      <div>
        <Label htmlFor="category">Catégorie</Label>
        <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner une catégorie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Immobilier">Immobilier</SelectItem>
            <SelectItem value="Décoration">Décoration</SelectItem>
            <SelectItem value="Conseils">Conseils</SelectItem>
            <SelectItem value="Actualités">Actualités</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="status">Status</Label>
        <Select value={formData.status} onValueChange={(value: BlogPost["status"]) => setFormData({ ...formData, status: value })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="draft">Brouillon</SelectItem>
            <SelectItem value="published">Publié</SelectItem>
            <SelectItem value="scheduled">Programmé</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="content">Contenu</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, content: e.target.value })}
          placeholder="Contenu complet de l'article..."
          rows={8}
        />
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button
          variant="outline"
          onClick={() => {
            if (isEdit) {
              setEditingPost(null)
            } else {
              setIsCreateModalOpen(false)
            }
            setFormData({ title: "", excerpt: "", content: "", category: "", status: "draft" })
          }}
        >
          Annuler
        </Button>
        <Button onClick={isEdit ? handleUpdatePost : handleCreatePost}>
          <IconDeviceFloppy className="w-4 h-4 mr-2" />
          {isEdit ? "Mettre à jour" : "Créer"}
        </Button>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Blog Builder</h1>
          <p className="text-muted-foreground">
            Gérez et créez du contenu pour votre blog
          </p>
        </div>
        
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <IconPlus className="w-4 h-4 mr-2" />
              Nouvel Article
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Créer un nouvel article</DialogTitle>
              <DialogDescription>
                Rédigez un nouvel article pour votre blog
              </DialogDescription>
            </DialogHeader>
            <PostForm />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{posts.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Publiés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {posts.filter(p => p.status === "published").length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Brouillons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {posts.filter(p => p.status === "draft").length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Programmés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {posts.filter(p => p.status === "scheduled").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Posts List */}
      <Card>
        <CardHeader>
          <CardTitle>Mes Articles</CardTitle>
          <CardDescription>
            Gérez tous vos articles de blog depuis cette interface
          </CardDescription>
        </CardHeader>
        <CardContent>
          {posts.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <IconEdit className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">Aucun article pour le moment</h3>
              <p className="mb-4">Commencez par créer votre premier article de blog</p>
              <Button onClick={() => setIsCreateModalOpen(true)}>
                <IconPlus className="w-4 h-4 mr-2" />
                Créer mon premier article
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{post.title}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(post.status)}`}>
                        {post.status === "published" ? "Publié" : post.status === "draft" ? "Brouillon" : "Programmé"}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{post.category}</span>
                      <span>Créé le {post.createdAt.toLocaleDateString()}</span>
                      {post.publishedAt && (
                        <span>Publié le {post.publishedAt.toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <IconEye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditPost(post)}
                    >
                      <IconEdit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeletePost(post.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <IconTrash className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Modal */}
      <Dialog open={editingPost !== null} onOpenChange={(open: boolean) => !open && setEditingPost(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Modifier l'article</DialogTitle>
            <DialogDescription>
              Modifiez les détails de votre article
            </DialogDescription>
          </DialogHeader>
          <PostForm isEdit />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default BlogBuilder
