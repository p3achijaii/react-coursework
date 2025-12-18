import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Shield, Clock } from "lucide-react";

import Button from "../../components/ui/Button";

import propertiesData from "../../assets/properties.json";

import styles from "./HomePage.module.css";
import { cn } from "../../utils";

function HomePage() {
  const featuredProperties = propertiesData.properties.slice(0, 3);
}

export default HomePage;
