import React from 'react'

export default function Footer() {
   return (
      <div>
         <div className="b-example-divider"></div>

         <div className="container-fluid bg-body">
            <footer className="py-3 my-4">
               <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                  <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Home</a></li>
                  <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Features</a></li>
                  <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Pricing</a></li>
                  <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">FAQs</a></li>
                  <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">About</a></li>
               </ul>
               <p className="text-center text-muted">&copy; 2022 Company, Inc</p>
            </footer>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossOrigin="anonymous"></script>
         </div>

      </div>
   )
}
