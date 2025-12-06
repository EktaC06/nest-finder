import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronLeft, ChevronRight, Star, MapPin, Phone, MessageCircle,
  Heart, Share2, Verified, Shield, Utensils, Clock, Users,
  Calendar, CreditCard, ArrowRight
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockPGs, amenityIcons, PGRoom } from "@/data/mockPGs";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

export default function PGDetailPage() {
  const { slug } = useParams();
  const pg = mockPGs.find((p) => p.slug === slug) || mockPGs[0];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState<PGRoom | null>(pg.rooms[0]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % pg.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + pg.images.length) % pg.images.length);
  };

  const handleBookNow = () => {
    if (!selectedRoom) {
      toast({
        title: "Select a room type",
        description: "Please select a room type before booking",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Booking initiated!",
      description: "Redirecting to booking page...",
    });
  };

  const handleScheduleVisit = () => {
    toast({
      title: "Visit scheduled!",
      description: "We'll contact you to confirm the visit timing.",
    });
  };

  const typeVariant = pg.type === "boys" ? "boys" : pg.type === "girls" ? "girls" : "coed";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-muted/50 border-b">
          <div className="container py-3">
            <div className="flex items-center gap-2 text-sm">
              <Link to="/" className="text-muted-foreground hover:text-foreground">
                Home
              </Link>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <Link to="/search" className="text-muted-foreground hover:text-foreground">
                PGs in {pg.city}
              </Link>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground font-medium">{pg.name}</span>
            </div>
          </div>
        </div>

        <div className="container py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Image Gallery */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/9] group">
                <img
                  src={pg.images[currentImageIndex]}
                  alt={`${pg.name} - Image ${currentImageIndex + 1}`}
                  className="h-full w-full object-cover"
                />

                {/* Navigation */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-card/90 backdrop-blur-sm shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-card"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-card/90 backdrop-blur-sm shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-card"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                {/* Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                  {pg.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={cn(
                        "h-2 rounded-full transition-all",
                        index === currentImageIndex ? "w-6 bg-primary-foreground" : "w-2 bg-primary-foreground/50"
                      )}
                    />
                  ))}
                </div>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <Badge variant={typeVariant} className="capitalize text-sm">
                    {pg.type === "coed" ? "Co-ed" : pg.type}
                  </Badge>
                  {pg.verified && (
                    <Badge variant="success" className="gap-1">
                      <Verified className="h-3 w-3" />
                      Verified
                    </Badge>
                  )}
                </div>

                {/* Actions */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <Button variant="secondary" size="icon" className="rounded-full">
                    <Share2 className="h-5 w-5" />
                  </Button>
                  <Button variant="secondary" size="icon" className="rounded-full">
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {pg.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={cn(
                      "flex-shrink-0 h-20 w-28 rounded-lg overflow-hidden border-2 transition-colors",
                      index === currentImageIndex ? "border-primary" : "border-transparent"
                    )}
                  >
                    <img src={image} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Title & Info */}
              <div>
                <h1 className="text-3xl font-bold mb-2">{pg.name}</h1>
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-5 w-5" />
                    {pg.address}, {pg.locality}, {pg.city}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-warning text-warning" />
                    <span className="font-semibold text-foreground">{pg.rating}</span>
                    <span>({pg.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="rooms">Rooms & Pricing</TabsTrigger>
                  <TabsTrigger value="amenities">Amenities</TabsTrigger>
                  <TabsTrigger value="rules">House Rules</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6 pt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>About this PG</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {pg.description}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Quick Highlights */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-muted">
                      <Utensils className="h-6 w-6 text-primary" />
                      <div>
                        <div className="font-medium">Food</div>
                        <div className="text-sm text-muted-foreground">
                          {pg.foodIncluded ? "Included" : "Not Included"}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-muted">
                      <Users className="h-6 w-6 text-primary" />
                      <div>
                        <div className="font-medium">Gender</div>
                        <div className="text-sm text-muted-foreground capitalize">
                          {pg.type === "coed" ? "Co-ed" : pg.type}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-muted">
                      <Shield className="h-6 w-6 text-primary" />
                      <div>
                        <div className="font-medium">Verified</div>
                        <div className="text-sm text-muted-foreground">
                          {pg.verified ? "Yes" : "No"}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-muted">
                      <Clock className="h-6 w-6 text-primary" />
                      <div>
                        <div className="font-medium">Gate Timing</div>
                        <div className="text-sm text-muted-foreground">11 PM</div>
                      </div>
                    </div>
                  </div>

                  {/* Nearby Places */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Nearby Places</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {pg.nearbyPlaces.map((place) => (
                          <div
                            key={place.name}
                            className="flex items-center gap-3 p-3 rounded-lg bg-muted"
                          >
                            <MapPin className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <div className="font-medium text-sm">{place.name}</div>
                              <div className="text-xs text-muted-foreground">{place.distance}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="rooms" className="pt-6">
                  <div className="space-y-4">
                    {pg.rooms.map((room) => (
                      <Card
                        key={room.id}
                        className={cn(
                          "cursor-pointer transition-all",
                          selectedRoom?.id === room.id && "ring-2 ring-primary"
                        )}
                        onClick={() => setSelectedRoom(room)}
                      >
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-3">
                                <h3 className="text-xl font-semibold capitalize">
                                  {room.type} Sharing ({room.sharing} bed{room.sharing > 1 ? "s" : ""})
                                </h3>
                                {room.ac && <Badge variant="info">AC</Badge>}
                              </div>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span>{room.available} beds available</span>
                                <span>Deposit: ₹{room.deposit.toLocaleString()}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-3xl font-bold text-primary">
                                ₹{room.price.toLocaleString()}
                              </div>
                              <div className="text-sm text-muted-foreground">per month</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="amenities" className="pt-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {pg.amenities.map((amenity) => (
                          <div
                            key={amenity}
                            className="flex items-center gap-3 p-3 rounded-lg bg-muted"
                          >
                            <span className="text-2xl">{amenityIcons[amenity] || "✓"}</span>
                            <span className="font-medium">{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="rules" className="pt-6">
                  <Card>
                    <CardContent className="p-6">
                      <ul className="space-y-3">
                        {pg.rules.map((rule, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-medium">
                              {index + 1}
                            </div>
                            <span>{rule}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="reviews" className="pt-6">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="text-6xl mb-4">⭐</div>
                      <h3 className="text-xl font-semibold mb-2">Reviews coming soon</h3>
                      <p className="text-muted-foreground">
                        Be the first to review this PG after your stay!
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Booking Card */}
                <Card className="shadow-lg">
                  <CardContent className="p-6 space-y-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-primary">
                        ₹{selectedRoom?.price.toLocaleString() || pg.minPrice.toLocaleString()}
                      </span>
                      <span className="text-muted-foreground">/month</span>
                    </div>

                    {selectedRoom && (
                      <div className="p-4 rounded-lg bg-muted space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Room Type</span>
                          <span className="font-medium capitalize">{selectedRoom.type} Sharing</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Security Deposit</span>
                          <span className="font-medium">₹{selectedRoom.deposit.toLocaleString()}</span>
                        </div>
                        {pg.foodIncluded && (
                          <div className="flex justify-between text-sm">
                            <span>Food</span>
                            <span className="font-medium text-success">Included</span>
                          </div>
                        )}
                      </div>
                    )}

                    <Button
                      variant="hero"
                      size="lg"
                      className="w-full gap-2"
                      onClick={handleBookNow}
                    >
                      <CreditCard className="h-5 w-5" />
                      Book Now
                    </Button>

                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full gap-2"
                      onClick={handleScheduleVisit}
                    >
                      <Calendar className="h-5 w-5" />
                      Schedule a Visit
                    </Button>

                    <div className="flex gap-2">
                      <Button variant="secondary" size="lg" className="flex-1 gap-2">
                        <Phone className="h-5 w-5" />
                        Call
                      </Button>
                      <Button variant="secondary" size="lg" className="flex-1 gap-2">
                        <MessageCircle className="h-5 w-5" />
                        WhatsApp
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Owner Card */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xl font-bold text-primary">
                          {pg.owner.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold flex items-center gap-2">
                          {pg.owner.name}
                          {pg.owner.verified && (
                            <Verified className="h-4 w-4 text-success" />
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">Property Owner</div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Verified owner with {Math.floor(Math.random() * 5) + 1}+ years of hosting experience
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}