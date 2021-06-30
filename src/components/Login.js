export default () => {
    return(
        <>
 
        
        <body className="d-flex flex-column bg-dark justify-content-center align-items-center vh-100 box">
          <div className="p-5 bg-light rounded w-100">
            <h2 className="mb-5 text-danger text-center">QuizLab</h2>
            {/* Ja neizdevas ielogoties */}
            <div className="alert alert-danger d-flex align-items-center justify-content-center">
              <div>{error}</div>
            </div>
  
            <form action="" method="POST">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  placeholder="Lieotājvārds"
                />
                <label for="username">Lieotājvārds</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Parole"
                />
                <label for="password">Parole</label>
              </div>
              <button className="btn btn-danger btn-lg w-100">Ienākt</button>
            </form>
            <div className="mt-3">
              <h5 className=" text-center mb-3">Nav profils?</h5>
              {/* <Link href="/register">
                <button className="btn btn-danger w-100">Izveidot Profilu</button>
              </Link> */}
            </div>
          </div>
        </body>
      </>
    );
}