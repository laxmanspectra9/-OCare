import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Throttled function with cancel method
interface ThrottledFunction<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): ReturnType<T>;
  cancel: () => void;
}

function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ThrottledFunction<T> {
  let inThrottle: boolean;
  let lastFunc: ReturnType<typeof setTimeout>;
  let lastRan: number;

  const throttled = function(this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      lastRan = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(this, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  } as ThrottledFunction<T>;

  throttled.cancel = function() {
    clearTimeout(lastFunc);
    inThrottle = false;
  };

  return throttled;
}

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "Products", href: "#products" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Use a ref to track scroll state without causing re-renders
  const isScrolledRef = useRef(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Debounce scroll handler to prevent excessive updates
  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > 20;
    if (scrolled !== isScrolledRef.current) {
      isScrolledRef.current = scrolled;
      setIsScrolled(scrolled);
    }
  }, []);
  
  // Throttle scroll events for better perfofirmance
  const throttledScroll = useMemo(
    () => throttle(handleScroll, 100),
    [handleScroll]
  );

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    if (href === '/') {
      // If clicking on Home, always navigate to the root
      if (location.pathname === '/') {
        // Smooth scroll to top if already on home
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      } else {
        navigate('/', { replace: true });
      }
    } 
    else if (href.startsWith('#')) {
      const sectionId = href;
      
      // If we're not on the home page, navigate to home with hash
      if (location.pathname !== '/') {
        navigate(`/${sectionId}`, { replace: true });
      } else {
        // Use a more controlled scroll animation
        const element = document.querySelector(sectionId);
        if (element) {
          const headerOffset = 120; // Adjust this value based on your header height
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    } else {
      // Regular navigation to other pages
      navigate(href);
    }
    
    setIsMobileMenuOpen(false);
  };

  // Handle scroll to section after navigation
  useEffect(() => {
    const handleRouteChange = () => {
      const { hash } = window.location;
      if (hash) {
        // Small timeout to ensure the page has rendered
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start',
            });
          }
        }, 100);
      }
    };

    // Initial check
    handleRouteChange();

    // Listen for route changes
    const unlisten = () => {
      window.addEventListener('popstate', handleRouteChange);
    };
    
    // Cleanup
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [location]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    // Initial check
    handleScroll();
    
    // Add scroll listener
    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    // Cleanup function
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      // Cancel any pending throttled calls
      if (throttledScroll.cancel) {
        throttledScroll.cancel();
      }
    };
  }, [throttledScroll]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "glass shadow-card py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-soft">
                <span className="text-primary-foreground font-bold text-3xl -mb-1">O</span>
              </div>
              <span className="text-2xl font-bold text-foreground">
                Care
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = link.href.startsWith('#') 
                ? location.pathname === '/' && location.hash === link.href
                : location.pathname === link.href;

              return (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={cn(
                    "relative text-sm font-medium transition-colors duration-300 hover:text-primary",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link to="/contact">
              <Button variant="default" size="sm">
                Get in Touch
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-6 flex flex-col gap-4">
                {navLinks.map((link, index) => {
                  const isActive = link.href.startsWith('#') 
                    ? location.pathname === '/' && location.hash === link.href
                    : location.pathname === link.href;

                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={link.href}
                        onClick={(e) => scrollToSection(e, link.href)}
                        className={cn(
                          "block py-2 text-lg font-medium transition-colors",
                          isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
                        )}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  );
                })}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link to="/contact">
                    <Button variant="default" className="w-full mt-4">
                      Get in Touch
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};