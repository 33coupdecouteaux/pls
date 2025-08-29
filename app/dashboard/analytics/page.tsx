"use client"

import React from "react"
import { 
  IconTrendingUp, 
  IconEye, 
  IconHeart, 
  IconMessage, 
  IconUsers,
  IconHome,
  IconCalendar,
  IconCurrencyEuro
} from "@tabler/icons-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const Analytics = () => {
  // Données vides pour le démarrage
  const stats = {
    totalViews: 0,
    totalListings: 0,
    totalInquiries: 0,
    totalFavorites: 0,
    conversionRate: 0,
    averagePrice: 0,
  }

  const recentActivity: any[] = []

  const topProperties: any[] = []

  const monthlyData = [
    { month: "Jan", views: 0, inquiries: 0 },
    { month: "Fév", views: 0, inquiries: 0 },
    { month: "Mar", views: 0, inquiries: 0 },
    { month: "Avr", views: 0, inquiries: 0 },
    { month: "Mai", views: 0, inquiries: 0 },
    { month: "Jun", views: 0, inquiries: 0 },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">
            Suivez les performances de vos annonces
          </p>
        </div>
        
        <Select defaultValue="30days">
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">7 derniers jours</SelectItem>
            <SelectItem value="30days">30 derniers jours</SelectItem>
            <SelectItem value="90days">90 derniers jours</SelectItem>
            <SelectItem value="1year">Cette année</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Main Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Vues</CardTitle>
            <IconEye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center gap-1">
                <IconTrendingUp className="w-3 h-3" />
                +12.5%
              </span>
              par rapport au mois dernier
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Annonces Actives</CardTitle>
            <IconHome className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalListings}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center gap-1">
                <IconTrendingUp className="w-3 h-3" />
                +2
              </span>
              nouvelles ce mois
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Demandes</CardTitle>
            <IconMessage className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalInquiries}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center gap-1">
                <IconTrendingUp className="w-3 h-3" />
                +8.2%
              </span>
              par rapport au mois dernier
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de Conversion</CardTitle>
            <IconUsers className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.conversionRate}%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center gap-1">
                <IconTrendingUp className="w-3 h-3" />
                +0.5%
              </span>
              par rapport au mois dernier
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Performance Chart Placeholder */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Performance Mensuelle</CardTitle>
            <CardDescription>
              Évolution des vues et des demandes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-end justify-between gap-2 p-4 border rounded-lg bg-muted/20">
              {monthlyData.map((data, index) => (
                <div key={data.month} className="flex flex-col items-center gap-2 flex-1">
                  <div className="flex gap-1">
                    <div 
                      className="w-4 bg-primary rounded-t"
                      style={{ height: `${(data.views / 2000) * 200}px` }}
                    />
                    <div 
                      className="w-4 bg-secondary rounded-t"
                      style={{ height: `${(data.inquiries / 25) * 200}px` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{data.month}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded" />
                <span className="text-sm">Vues</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-secondary rounded" />
                <span className="text-sm">Demandes</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Activité Récente</CardTitle>
            <CardDescription>
              Dernières interactions sur vos annonces
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentActivity.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <IconCalendar className="w-8 h-8 mx-auto mb-4 opacity-50" />
                <p>Aucune activité récente</p>
                <p className="text-xs">L'activité apparaîtra ici une fois que vous aurez des annonces</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <activity.icon className="w-4 h-4 text-muted-foreground mt-1" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {activity.property}
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Properties */}
      <Card>
        <CardHeader>
          <CardTitle>Propriétés les Plus Performantes</CardTitle>
          <CardDescription>
            Vos annonces avec le plus d'engagement
          </CardDescription>
        </CardHeader>
        <CardContent>
          {topProperties.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <IconHome className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Aucune propriété pour le moment</p>
              <p className="text-sm">Créez votre première annonce pour voir les statistiques</p>
            </div>
          ) : (
            <div className="space-y-4">
              {topProperties.map((property, index) => (
                <div key={property.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold">{property.title}</h3>
                      <p className="text-sm text-muted-foreground">{property.price}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <IconEye className="w-4 h-4" />
                      {property.views.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <IconMessage className="w-4 h-4" />
                      {property.inquiries}
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <IconHeart className="w-4 h-4" />
                      {property.favorites}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default Analytics
