export const Loader = () => {
    return(
        <div style={{display:'flex' , justifyContent:'center' , paddingTop:'2.5rem' , paddingBottom:'2.5rem'}}>
           
             <div className="preloader-wrapper big active">
            <div className="spinner-layer spinner-red-only">
            <div className="circle-clipper left">
                <div className="circle"></div>
            </div><div className="gap-patch">
                <div className="circle"></div>
            </div><div className="circle-clipper right">
                <div className="circle"></div>
            </div>
            </div>
        </div>



           
        </div>
    )
}