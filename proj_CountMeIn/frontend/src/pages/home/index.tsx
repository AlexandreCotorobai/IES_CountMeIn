import { Button } from "@/components/ui/button";
import logo from "@/assets/CountMeIn_logo.svg"; // Ajuste o caminho conforme necessário

export function Component() {
  return (
    <div className="flex min-h-screen pb-32">
      <main className="grid xs:grid-cols-1 justify-center items-center xl:grid-cols-2 w-full">
        {/* Ajuste o alinhamento dos itens com base no tamanho da tela */}
        <div className="xl:flex hidden justify-center xl:items-center items-start w-full h-full">
            <img src={logo} alt="CountMeIn" className="h-5/12 w-5/12"/>
        </div>
        <div className="max-w-4xl rounded-xl text-center p-6 space-y-6">
            <h1 className="xl:text-9xl md:text-8xl text-7xl font-normal font-['Lexend Exa']">Count Me In</h1>
            <div className="bg-cyan-950 rounded-xl p-6 space-y-6">
                <div className="text-center text-sky-100 text-xl font-normal font-['Ubuntu']">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam faucibus purus in massa. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis. Egestas erat imperdiet sed euismod. Volutpat maecenas volutpat blandit aliquam etiam erat. Felis bibendum ut tristique et egestas quis ipsum suspendisse. Amet consectetur adipiscing elit duis. Dignissim convallis aenean et tortor at risus viverra. Donec ac odio tempor orci dapibus ultrices in iaculis. Morbi tempus iaculis urna id volutpat. Consectetur adipiscing elit pellentesque habitant. Id venenatis a condimentum vitae sapien pellentesque habitant morbi.<br/><br/>Quis hendrerit dolor magna eget est lorem. Eros donec ac odio tempor orci dapibus ultrices. Sed nisi lacus sed viverra tellus in hac. Vitae tempus quam pellentesque nec nam aliquam sem et. Ut faucibus pulvinar elementum integer enim neque volutpat ac. Turpis egestas maecenas pharetra convallis posuere morbi leo urna molestie. Enim diam vulputate ut pharetra sit amet. Aenean et tortor at risus viverra adipiscing at. Consectetur a erat nam at lectus. Pretium viverra suspendisse potenti nullam ac tortor vitae purus.<br/><br/></div>
                <Button className="text-sky-100 rounded-full">Contact Us</Button>
            </div>
        </div>
      </main>
    </div>
  );
}

export default Component;
