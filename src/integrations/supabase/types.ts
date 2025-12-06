export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      bookings: {
        Row: {
          booking_number: string
          created_at: string | null
          id: string
          move_in_date: string
          payment_status: string | null
          pg_id: string
          platform_fee: number | null
          rent_amount: number
          room_type_id: string
          security_deposit: number
          status: Database["public"]["Enums"]["booking_status"] | null
          tenant_email: string
          tenant_id_proof_url: string | null
          tenant_name: string
          tenant_phone: string
          tenure_months: number
          total_amount: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          booking_number: string
          created_at?: string | null
          id?: string
          move_in_date: string
          payment_status?: string | null
          pg_id: string
          platform_fee?: number | null
          rent_amount: number
          room_type_id: string
          security_deposit: number
          status?: Database["public"]["Enums"]["booking_status"] | null
          tenant_email: string
          tenant_id_proof_url?: string | null
          tenant_name: string
          tenant_phone: string
          tenure_months: number
          total_amount: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          booking_number?: string
          created_at?: string | null
          id?: string
          move_in_date?: string
          payment_status?: string | null
          pg_id?: string
          platform_fee?: number | null
          rent_amount?: number
          room_type_id?: string
          security_deposit?: number
          status?: Database["public"]["Enums"]["booking_status"] | null
          tenant_email?: string
          tenant_id_proof_url?: string | null
          tenant_name?: string
          tenant_phone?: string
          tenure_months?: number
          total_amount?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_pg_id_fkey"
            columns: ["pg_id"]
            isOneToOne: false
            referencedRelation: "pgs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_room_type_id_fkey"
            columns: ["room_type_id"]
            isOneToOne: false
            referencedRelation: "room_types"
            referencedColumns: ["id"]
          },
        ]
      }
      cities: {
        Row: {
          created_at: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          name: string
          pg_count: number | null
          state: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name: string
          pg_count?: number | null
          state: string
        }
        Update: {
          created_at?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name?: string
          pg_count?: number | null
          state?: string
        }
        Relationships: []
      }
      coupons: {
        Row: {
          city_ids: string[] | null
          code: string
          created_at: string | null
          description: string | null
          discount_type: string
          discount_value: number
          id: string
          is_active: boolean | null
          max_discount: number | null
          min_booking_amount: number | null
          usage_limit: number | null
          used_count: number | null
          valid_from: string
          valid_until: string
        }
        Insert: {
          city_ids?: string[] | null
          code: string
          created_at?: string | null
          description?: string | null
          discount_type: string
          discount_value: number
          id?: string
          is_active?: boolean | null
          max_discount?: number | null
          min_booking_amount?: number | null
          usage_limit?: number | null
          used_count?: number | null
          valid_from: string
          valid_until: string
        }
        Update: {
          city_ids?: string[] | null
          code?: string
          created_at?: string | null
          description?: string | null
          discount_type?: string
          discount_value?: number
          id?: string
          is_active?: boolean | null
          max_discount?: number | null
          min_booking_amount?: number | null
          usage_limit?: number | null
          used_count?: number | null
          valid_from?: string
          valid_until?: string
        }
        Relationships: []
      }
      enquiries: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          is_read: boolean | null
          message: string | null
          name: string
          pg_id: string
          phone: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: string
          is_read?: boolean | null
          message?: string | null
          name: string
          pg_id: string
          phone: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          is_read?: boolean | null
          message?: string | null
          name?: string
          pg_id?: string
          phone?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "enquiries_pg_id_fkey"
            columns: ["pg_id"]
            isOneToOne: false
            referencedRelation: "pgs"
            referencedColumns: ["id"]
          },
        ]
      }
      localities: {
        Row: {
          city_id: string
          created_at: string | null
          id: string
          landmark: string | null
          name: string
        }
        Insert: {
          city_id: string
          created_at?: string | null
          id?: string
          landmark?: string | null
          name: string
        }
        Update: {
          city_id?: string
          created_at?: string | null
          id?: string
          landmark?: string | null
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "localities_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          booking_id: string
          created_at: string | null
          id: string
          payment_method: string | null
          status: string | null
          transaction_id: string | null
        }
        Insert: {
          amount: number
          booking_id: string
          created_at?: string | null
          id?: string
          payment_method?: string | null
          status?: string | null
          transaction_id?: string | null
        }
        Update: {
          amount?: number
          booking_id?: string
          created_at?: string | null
          id?: string
          payment_method?: string | null
          status?: string | null
          transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      pgs: {
        Row: {
          address: string
          amenities: string[] | null
          city_id: string
          created_at: string | null
          curfew_time: string | null
          description: string | null
          food_included: boolean | null
          food_type: string | null
          house_rules: string[] | null
          id: string
          images: string[] | null
          is_active: boolean | null
          is_verified: boolean | null
          latitude: number | null
          locality_id: string | null
          longitude: number | null
          max_price: number | null
          min_price: number | null
          name: string
          nearby_colleges: string[] | null
          nearby_landmarks: string[] | null
          owner_id: string
          pg_type: Database["public"]["Enums"]["pg_type"]
          rating: number | null
          total_reviews: number | null
          updated_at: string | null
          visitor_policy: string | null
        }
        Insert: {
          address: string
          amenities?: string[] | null
          city_id: string
          created_at?: string | null
          curfew_time?: string | null
          description?: string | null
          food_included?: boolean | null
          food_type?: string | null
          house_rules?: string[] | null
          id?: string
          images?: string[] | null
          is_active?: boolean | null
          is_verified?: boolean | null
          latitude?: number | null
          locality_id?: string | null
          longitude?: number | null
          max_price?: number | null
          min_price?: number | null
          name: string
          nearby_colleges?: string[] | null
          nearby_landmarks?: string[] | null
          owner_id: string
          pg_type: Database["public"]["Enums"]["pg_type"]
          rating?: number | null
          total_reviews?: number | null
          updated_at?: string | null
          visitor_policy?: string | null
        }
        Update: {
          address?: string
          amenities?: string[] | null
          city_id?: string
          created_at?: string | null
          curfew_time?: string | null
          description?: string | null
          food_included?: boolean | null
          food_type?: string | null
          house_rules?: string[] | null
          id?: string
          images?: string[] | null
          is_active?: boolean | null
          is_verified?: boolean | null
          latitude?: number | null
          locality_id?: string | null
          longitude?: number | null
          max_price?: number | null
          min_price?: number | null
          name?: string
          nearby_colleges?: string[] | null
          nearby_landmarks?: string[] | null
          owner_id?: string
          pg_type?: Database["public"]["Enums"]["pg_type"]
          rating?: number | null
          total_reviews?: number | null
          updated_at?: string | null
          visitor_policy?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pgs_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pgs_locality_id_fkey"
            columns: ["locality_id"]
            isOneToOne: false
            referencedRelation: "localities"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bank_account_number: string | null
          bank_ifsc: string | null
          bank_name: string | null
          budget_max: number | null
          budget_min: number | null
          business_name: string | null
          company_or_college: string | null
          created_at: string | null
          email: string | null
          food_preference: string | null
          full_name: string | null
          gender: Database["public"]["Enums"]["gender_type"] | null
          gst_number: string | null
          id: string
          id_proof_url: string | null
          kyc_verified: boolean | null
          phone: string | null
          preferred_cities: string[] | null
          profession: string | null
          sharing_preference: number[] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          bank_account_number?: string | null
          bank_ifsc?: string | null
          bank_name?: string | null
          budget_max?: number | null
          budget_min?: number | null
          business_name?: string | null
          company_or_college?: string | null
          created_at?: string | null
          email?: string | null
          food_preference?: string | null
          full_name?: string | null
          gender?: Database["public"]["Enums"]["gender_type"] | null
          gst_number?: string | null
          id?: string
          id_proof_url?: string | null
          kyc_verified?: boolean | null
          phone?: string | null
          preferred_cities?: string[] | null
          profession?: string | null
          sharing_preference?: number[] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          bank_account_number?: string | null
          bank_ifsc?: string | null
          bank_name?: string | null
          budget_max?: number | null
          budget_min?: number | null
          business_name?: string | null
          company_or_college?: string | null
          created_at?: string | null
          email?: string | null
          food_preference?: string | null
          full_name?: string | null
          gender?: Database["public"]["Enums"]["gender_type"] | null
          gst_number?: string | null
          id?: string
          id_proof_url?: string | null
          kyc_verified?: boolean | null
          phone?: string | null
          preferred_cities?: string[] | null
          profession?: string | null
          sharing_preference?: number[] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          booking_id: string | null
          comment: string | null
          created_at: string | null
          id: string
          images: string[] | null
          is_verified: boolean | null
          pg_id: string
          rating: number
          user_id: string
        }
        Insert: {
          booking_id?: string | null
          comment?: string | null
          created_at?: string | null
          id?: string
          images?: string[] | null
          is_verified?: boolean | null
          pg_id: string
          rating: number
          user_id: string
        }
        Update: {
          booking_id?: string | null
          comment?: string | null
          created_at?: string | null
          id?: string
          images?: string[] | null
          is_verified?: boolean | null
          pg_id?: string
          rating?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_pg_id_fkey"
            columns: ["pg_id"]
            isOneToOne: false
            referencedRelation: "pgs"
            referencedColumns: ["id"]
          },
        ]
      }
      room_types: {
        Row: {
          amenities: string[] | null
          available_beds: number
          created_at: string | null
          id: string
          images: string[] | null
          is_ac: boolean | null
          name: string
          occupancy: number
          pg_id: string
          rent_per_bed: number
          security_deposit: number
          total_beds: number
          updated_at: string | null
        }
        Insert: {
          amenities?: string[] | null
          available_beds: number
          created_at?: string | null
          id?: string
          images?: string[] | null
          is_ac?: boolean | null
          name: string
          occupancy: number
          pg_id: string
          rent_per_bed: number
          security_deposit: number
          total_beds: number
          updated_at?: string | null
        }
        Update: {
          amenities?: string[] | null
          available_beds?: number
          created_at?: string | null
          id?: string
          images?: string[] | null
          is_ac?: boolean | null
          name?: string
          occupancy?: number
          pg_id?: string
          rent_per_bed?: number
          security_deposit?: number
          total_beds?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "room_types_pg_id_fkey"
            columns: ["pg_id"]
            isOneToOne: false
            referencedRelation: "pgs"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      visits: {
        Row: {
          created_at: string | null
          id: string
          notes: string | null
          pg_id: string
          scheduled_date: string
          scheduled_time: string
          status: Database["public"]["Enums"]["visit_status"] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          notes?: string | null
          pg_id: string
          scheduled_date: string
          scheduled_time: string
          status?: Database["public"]["Enums"]["visit_status"] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          notes?: string | null
          pg_id?: string
          scheduled_date?: string
          scheduled_time?: string
          status?: Database["public"]["Enums"]["visit_status"] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "visits_pg_id_fkey"
            columns: ["pg_id"]
            isOneToOne: false
            referencedRelation: "pgs"
            referencedColumns: ["id"]
          },
        ]
      }
      wishlists: {
        Row: {
          created_at: string | null
          id: string
          pg_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          pg_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          pg_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wishlists_pg_id_fkey"
            columns: ["pg_id"]
            isOneToOne: false
            referencedRelation: "pgs"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "client" | "owner" | "broker" | "admin"
      booking_status: "pending" | "confirmed" | "cancelled" | "completed"
      gender_type: "male" | "female" | "other"
      pg_type: "boys" | "girls" | "co-ed"
      visit_status: "scheduled" | "completed" | "cancelled" | "no_show"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["client", "owner", "broker", "admin"],
      booking_status: ["pending", "confirmed", "cancelled", "completed"],
      gender_type: ["male", "female", "other"],
      pg_type: ["boys", "girls", "co-ed"],
      visit_status: ["scheduled", "completed", "cancelled", "no_show"],
    },
  },
} as const
