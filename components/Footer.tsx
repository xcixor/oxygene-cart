import Link from "next/link";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import MaxWidthWrapper from "./MaxWidthWrapper";

const Footer = () => {
  return (
    <footer className="mt-auto border-t bg-white">
      <MaxWidthWrapper>
        <div className="py-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="text-lg font-semibold">FakerShop</h3>
              <p className="mt-4 text-sm text-muted-foreground">
                Your one-stop shop for quality products at great prices.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <ul className="mt-4 space-y-2">
                {[
                  { name: "Home", path: "/" },
                  { name: "Products", path: "/" },
                  { name: "Categories", path: "/categories" },
                  { name: "Cart", path: "/cart" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.path}
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Contact</h3>
              <ul className="mt-4 space-y-2">
                <li className="text-sm text-muted-foreground">
                  Email: support@fakershop.com
                </li>
                <li className="text-sm text-muted-foreground">
                  Phone: (555) 123-4567
                </li>
                <li className="text-sm text-muted-foreground">
                  Address: 123 E-commerce St.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Follow Us</h3>
              <div className="mt-4 flex space-x-4">
                <a
                  href="https://github.com/xcixor"
                  className="text-muted-foreground hover:text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="h-6 w-6" />
                </a>
                <a
                  href="https://twitter.com/xcixor"
                  className="text-muted-foreground hover:text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter className="h-6 w-6" />
                </a>
                <a
                  href="https://www.linkedin.com/in/engpeterndungu/"
                  className="text-muted-foreground hover:text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} FakerShop. All rights reserved.
            </p>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
