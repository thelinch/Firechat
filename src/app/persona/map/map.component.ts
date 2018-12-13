import { Component, OnInit, ViewChild } from '@angular/core';
import { IncidenciaService } from 'src/app/services/incidencia.service';
import { Observable } from 'rxjs';
import { incidencias } from 'src/app/modelos/incidencias';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  latitudCenter: number = -9.9016775
  longitudCenter: number = -77.2549935
  listaIncidencia: Observable<incidencias[]>
  colorMolienda = '#7b1fa2'
  poligonMoliendaCoords = [
    { lat: -9.563204, lng: -77.04613 },
    { lat: -9.563848, lng: -77.046264 },
    { lat: -9.564247, lng: -77.046874 },
    { lat: -9.563711, lng: -77.04768 },
    { lat: -9.562632, lng: -77.048064 },
    { lat: -9.560467, lng: -77.050321 },
    { lat: -9.560095, lng: -77.050131 },
    { lat: -9.560487, lng: -77.049381 },
    { lat: -9.559336, lng: -77.047452 },
    { lat: -9.559714, lng: -77.046615 },
    { lat: -9.560595, lng: -77.045551 },
    { lat: -9.561231, lng: -77.04479 },
    { lat: -9.561473, lng: -77.045137 },
    { lat: -9.562059, lng: -77.045516 },
    { lat: -9.562601, lng: -77.046069 },
    { lat: -9.563204, lng: -77.04613 },

  ]

  poliginoPerforacionCoords = [
    { lat: -9.554696, lng: -77.070709 },
    { lat: -9.553509, lng: -77.072577 },
    { lat: -9.551016, lng: -77.073526 },
    { lat: -9.549108, lng: -77.07255 },
    { lat: -9.547673, lng: -77.072542 },
    { lat: -9.549656, lng: -77.076939 },
    { lat: -9.551063, lng: -77.08167 },
    { lat: -9.55354, lng: -77.08342 },
    { lat: -9.553674, lng: -77.084914 },
    { lat: -9.551574, lng: -77.087131 },
    { lat: -9.548457, lng: -77.083497 },
    { lat: -9.546245, lng: -77.078515 },
    { lat: -9.54478, lng: -77.073536 },
    { lat: -9.540914, lng: -77.07005 },
    { lat: -9.537186, lng: -77.068521 },
    { lat: -9.533748, lng: -77.0685 },
    { lat: -9.529129, lng: -77.066063 },
    { lat: -9.526457, lng: -77.062885 },
    { lat: -9.523036, lng: -77.060004 },
    { lat: -9.520042, lng: -77.060889 },
    { lat: -9.514197, lng: -77.063414 },
    { lat: -9.51332, lng: -77.060096 },
    { lat: -9.529412, lng: -77.043478 },
    { lat: -9.531195, lng: -77.045295 },
    { lat: -9.526673, lng: -77.051593 },
    { lat: -9.528955, lng: -77.055032 },
    { lat: -9.531172, lng: -77.054323 },
    { lat: -9.536328, lng: -77.051824 },
    { lat: -9.543804, lng: -77.051567 },
    { lat: -9.551367, lng: -77.046492 },
    { lat: -9.553811, lng: -77.047892 },
    { lat: -9.555489, lng: -77.04724 },
    { lat: -9.557163, lng: -77.04719 },
    { lat: -9.558052, lng: -77.04852 },
    { lat: -9.557739, lng: -77.050988 },
    { lat: -9.558622, lng: -77.053222 },
    { lat: -9.559814, lng: -77.053892 },
    { lat: -9.56066, lng: -77.052391 },
    { lat: -9.560491, lng: -77.050703 },
    { lat: -9.567571, lng: -77.046529 },
    { lat: -9.566741, lng: -77.045199 },
    { lat: -9.567654, lng: -77.042554 },
    { lat: -9.570714, lng: -77.040765 },
    { lat: -9.57304, lng: -77.041742 },
    { lat: -9.574653, lng: -77.041993 },
    { lat: -9.574071, lng: -77.039218 },
    { lat: -9.574503, lng: -77.036932 },
    { lat: -9.576661, lng: -77.036101 },
    { lat: -9.578445, lng: -77.037738 },
    { lat: -9.577001, lng: -77.039236 },
    { lat: -9.576991, lng: -77.040923 },
    { lat: -9.575668, lng: -77.04224 },
    { lat: -9.574698, lng: -77.044463 },
    { lat: -9.578478, lng: -77.042197 },
    { lat: -9.578941, lng: -77.043448 },
    { lat: -9.574504, lng: -77.046371 },
    { lat: -9.570757, lng: -77.049124 },
    { lat: -9.567759, lng: -77.051478 },
    { lat: -9.565333, lng: -77.05395 },
    { lat: -9.563484, lng: -77.055963 },
    { lat: -9.563248, lng: -77.05706 },
    { lat: -9.561289, lng: -77.05832 },
    { lat: -9.559899, lng: -77.060394 },
    { lat: -9.559142, lng: -77.06224 },
    { lat: -9.558388, lng: -77.063623 },
    { lat: -9.556826, lng: -77.065638 },
    { lat: -9.555563, lng: -77.06563 },
    { lat: -9.55464, lng: -77.066434 },
    { lat: -9.554763, lng: -77.067577 },
    { lat: -9.554709, lng: -77.068589 },
    { lat: -9.555038, lng: -77.069579 },
    { lat: -9.554696, lng: -77.070709 },

  ]
  poligonoPuertoAntaminaCoords = [
    { lat: -10.128545, lng: -78.12381 },
    { lat: -10.128083, lng: -78.167734 },
    { lat: -10.122975, lng: -78.172121 },
    { lat: -10.118927, lng: -78.170635 },
    { lat: -10.112786, lng: -78.173082 },
    { lat: -10.111808, lng: -78.17534 },
    { lat: -10.113117, lng: -78.178439 },
    { lat: -10.111673, lng: -78.179438 },
    { lat: -10.109097, lng: -78.178978 },
    { lat: -10.107603, lng: -78.180218 },
    { lat: -10.107673, lng: -78.182919 },
    { lat: -10.106764, lng: -78.183055 },
    { lat: -10.104434, lng: -78.181778 },
    { lat: -10.101902, lng: -78.181753 },
    { lat: -10.099994, lng: -78.178945 },
    { lat: -10.09918, lng: -78.175605 },
    { lat: -10.100485, lng: -78.17321 },
    { lat: -10.103953, lng: -78.172913 },
    { lat: -10.108281, lng: -78.169121 },
    { lat: -10.102924, lng: -78.163637 },
    { lat: -10.105007, lng: -78.161806 },
    { lat: -10.104344, lng: -78.161143 },
    { lat: -10.101625, lng: -78.163605 },
    { lat: -10.098328, lng: -78.159732 },
    { lat: -10.100798, lng: -78.157525 },
    { lat: -10.100719, lng: -78.153365 },
    { lat: -10.10655, lng: -78.149563 },
    { lat: -10.109477, lng: -78.149592 },
    { lat: -10.111407, lng: -78.140536 },
    { lat: -10.112126, lng: -78.136487 },
    { lat: -10.110919, lng: -78.134921 },
    { lat: -10.128545, lng: -78.12381 },
  ]

  poligonoantaminaCoords = [
    { lat: -9.509472, lng: -77.049491 },
    { lat: -9.513247, lng: -77.042888 },
    { lat: -9.517141, lng: -77.041556 },
    { lat: -9.517018, lng: -77.037038 },
    { lat: -9.519434, lng: -77.032987 },
    { lat: -9.520055, lng: -77.028925 },
    { lat: -9.523812, lng: -77.025483 },
    { lat: -9.527924, lng: -77.024254 },
    { lat: -9.55174, lng: -77.024758 },
    { lat: -9.553579, lng: -77.021258 },
    { lat: -9.557991, lng: -77.018383 },
    { lat: -9.559993, lng: -77.012746 },
    { lat: -9.560629, lng: -77.011885 },
    { lat: -9.561156, lng: -77.010038 },
    { lat: -9.560959, lng: -77.00436 },
    { lat: -9.56446, lng: -77.00438 },
    { lat: -9.565078, lng: -77.006707 },
    { lat: -9.565878, lng: -77.007463 },
    { lat: -9.567544, lng: -77.007126 },
    { lat: -9.56811, lng: -77.008633 },
    { lat: -9.56914, lng: -77.009044 },
    { lat: -9.570693, lng: -77.008474 },
    { lat: -9.572934, lng: -77.008141 },
    { lat: -9.574747, lng: -77.010245 },
    { lat: -9.57738, lng: -77.009899 },
    { lat: -9.580138, lng: -77.00847 },
    { lat: -9.583462, lng: -77.004492 },
    { lat: -9.59102, lng: -77.008534 },
    { lat: -9.593057, lng: -77.007943 },
    { lat: -9.596757, lng: -77.00917 },
    { lat: -9.60119, lng: -77.00763 },
    { lat: -9.603719, lng: -77.004611 },
    { lat: -9.606028, lng: -77.008562 },
    { lat: -9.607486, lng: -77.014897 },
    { lat: -9.611364, lng: -77.016426 },
    { lat: -9.614648, lng: -77.017198 },
    { lat: -9.613878, lng: -77.020959 },
    { lat: -9.613517, lng: -77.025474 },
    { lat: -9.615877, lng: -77.025816 },
    { lat: -9.619225, lng: -77.026302 },
    { lat: -9.627375, lng: -77.023217 },
    { lat: -9.623837, lng: -77.030508 },
    { lat: -9.621283, lng: -77.032752 },
    { lat: -9.616333, lng: -77.035735 },
    { lat: -9.612882, lng: -77.037823 },
    { lat: -9.608663, lng: -77.043521 },
    { lat: -9.604603, lng: -77.047714 },
    { lat: -9.601763, lng: -77.050241 },
    { lat: -9.601682, lng: -77.052115 },
    { lat: -9.600698, lng: -77.053555 },
    { lat: -9.596374, lng: -77.056768 },
    { lat: -9.593206, lng: -77.058542 },
    { lat: -9.591542, lng: -77.058531 },
    { lat: -9.589752, lng: -77.060198 },
    { lat: -9.586579, lng: -77.063013 },
    { lat: -9.583097, lng: -77.066635 },
    { lat: -9.581835, lng: -77.06923 },
    { lat: -9.579858, lng: -77.073439 },
    { lat: -9.583032, lng: -77.077391 },
    { lat: -9.581062, lng: -77.083934 },
    { lat: -9.577914, lng: -77.082469 },
    { lat: -9.572926, lng: -77.084751 },
    { lat: -9.568329, lng: -77.085494 },
    { lat: -9.568568, lng: -77.077593 },
    { lat: -9.571474, lng: -77.071634 },
    { lat: -9.571506, lng: -77.066237 },
    { lat: -9.569246, lng: -77.060055 },
    { lat: -9.570816, lng: -77.05351 },
    { lat: -9.560656, lng: -77.059388 },
    { lat: -9.555613, lng: -77.070923 },
    { lat: -9.551202, lng: -77.075439 },
    { lat: -9.55354, lng: -77.08342 },
    { lat: -9.556433, lng: -77.095402 },
    { lat: -9.546185, lng: -77.109192 },
    { lat: -9.541266, lng: -77.107054 },
    { lat: -9.538018, lng: -77.100408 },
    { lat: -9.539095, lng: -77.095296 },
    { lat: -9.535996, lng: -77.0885 },
    { lat: -9.530013, lng: -77.089216 },
    { lat: -9.526113, lng: -77.091451 },
    { lat: -9.515302, lng: -77.099667 },
    { lat: -9.512027, lng: -77.097388 },
    { lat: -9.511742, lng: -77.095129 },
    { lat: -9.508632, lng: -77.090291 },
    { lat: -9.504499, lng: -77.081533 },
    { lat: -9.506164, lng: -77.077929 },
    { lat: -9.511428, lng: -77.07254 },
    { lat: -9.511455, lng: -77.068023 },
    { lat: -9.512074, lng: -77.064413 },
    { lat: -9.511945, lng: -77.060949 },
    { lat: -9.503303, lng: -77.05623 },
    { lat: -9.508407, lng: -77.052647 },
    { lat: -9.509472, lng: -77.049491 }

  ]
  antaminaCoords = [
    { lat: -9.509472, lng: -77.049491 },
    { lat: -9.513247, lng: -77.042888 },
    { lat: -9.517141, lng: -77.041556 },
    { lat: -9.517018, lng: -77.037038 },
    { lat: -9.519434, lng: -77.032987 },
    { lat: -9.520055, lng: -77.028925 },
    { lat: -9.523812, lng: -77.025483 },
    { lat: -9.527924, lng: -77.024254 },
    { lat: -9.55174, lng: -77.024758 },
    { lat: -9.553579, lng: -77.021258 },
    { lat: -9.557991, lng: -77.018383 },
    { lat: -9.559993, lng: -77.012746 },
    { lat: -9.560629, lng: -77.011885 },
    { lat: -9.561156, lng: -77.010038 },
    { lat: -9.560959, lng: -77.00436 },
    { lat: -9.56446, lng: -77.00438 },
    { lat: -9.565078, lng: -77.006707 },
    { lat: -9.565878, lng: -77.007463 },
    { lat: -9.567544, lng: -77.007126 },
    { lat: -9.56811, lng: -77.008633 },
    { lat: -9.56914, lng: -77.009044 },
    { lat: -9.570693, lng: -77.008474 },
    { lat: -9.572934, lng: -77.008141 },
    { lat: -9.574747, lng: -77.010245 },
    { lat: -9.57738, lng: -77.009899 },
    { lat: -9.580138, lng: -77.00847 },
    { lat: -9.583462, lng: -77.004492 },
    { lat: -9.59102, lng: -77.008534 },
    { lat: -9.593057, lng: -77.007943 },
    { lat: -9.596757, lng: -77.00917 },
    { lat: -9.60119, lng: -77.00763 },
    { lat: -9.603719, lng: -77.004611 },
    { lat: -9.606028, lng: -77.008562 },
    { lat: -9.607486, lng: -77.014897 },
    { lat: -9.611364, lng: -77.016426 },
    { lat: -9.614648, lng: -77.017198 },
    { lat: -9.613878, lng: -77.020959 },
    { lat: -9.613517, lng: -77.025474 },
    { lat: -9.615877, lng: -77.025816 },
    { lat: -9.619225, lng: -77.026302 },
    { lat: -9.627375, lng: -77.023217 },
    { lat: -9.623837, lng: -77.030508 },
    { lat: -9.621283, lng: -77.032752 },
    { lat: -9.616333, lng: -77.035735 },
    { lat: -9.612882, lng: -77.037823 },
    { lat: -9.608663, lng: -77.043521 },
    { lat: -9.604603, lng: -77.047714 },
    { lat: -9.601763, lng: -77.050241 },
    { lat: -9.601682, lng: -77.052115 },
    { lat: -9.600698, lng: -77.053555 },
    { lat: -9.596374, lng: -77.056768 },
    { lat: -9.593206, lng: -77.058542 },
    { lat: -9.591542, lng: -77.058531 },
    { lat: -9.589752, lng: -77.060198 },
    { lat: -9.586579, lng: -77.063013 },
    { lat: -9.583097, lng: -77.066635 },
    { lat: -9.581835, lng: -77.06923 },
    { lat: -9.579858, lng: -77.073439 },
    { lat: -9.583032, lng: -77.077391 },
    { lat: -9.581062, lng: -77.083934 },
    { lat: -9.577914, lng: -77.082469 },
    { lat: -9.572926, lng: -77.084751 },
    { lat: -9.568329, lng: -77.085494 },
    { lat: -9.568568, lng: -77.077593 },
    { lat: -9.571474, lng: -77.071634 },
    { lat: -9.571506, lng: -77.066237 },
    { lat: -9.569246, lng: -77.060055 },
    { lat: -9.570816, lng: -77.05351 },
    { lat: -9.560656, lng: -77.059388 },
    { lat: -9.555613, lng: -77.070923 },
    { lat: -9.551202, lng: -77.075439 },
    { lat: -9.55354, lng: -77.08342 },
    { lat: -9.556433, lng: -77.095402 },
    { lat: -9.546185, lng: -77.109192 },
    { lat: -9.541266, lng: -77.107054 },
    { lat: -9.538018, lng: -77.100408 },
    { lat: -9.539095, lng: -77.095296 },
    { lat: -9.535996, lng: -77.0885 },
    { lat: -9.530013, lng: -77.089216 },
    { lat: -9.526113, lng: -77.091451 },
    { lat: -9.515302, lng: -77.099667 },
    { lat: -9.512027, lng: -77.097388 },
    { lat: -9.511742, lng: -77.095129 },
    { lat: -9.508632, lng: -77.090291 },
    { lat: -9.504499, lng: -77.081533 },
    { lat: -9.506164, lng: -77.077929 },
    { lat: -9.511428, lng: -77.07254 },
    { lat: -9.511455, lng: -77.068023 },
    { lat: -9.512074, lng: -77.064413 },
    { lat: -9.511945, lng: -77.060949 },
    { lat: -9.503303, lng: -77.05623 },
    { lat: -9.508407, lng: -77.052647 },
    { lat: -9.509472, lng: -77.049491 }

  ]
  flotacionCoords = [
    { lat: -9.562601, lng: -77.046069 },
    { lat: -9.562059, lng: -77.045516 },
    { lat: -9.561473, lng: -77.045137 },
    { lat: -9.560804, lng: -77.044179 },
    { lat: -9.56071, lng: -77.043137 },
    { lat: -9.561072, lng: -77.042648 },
    { lat: -9.561531, lng: -77.042535 },
    { lat: -9.56214, lng: -77.041541 },
    { lat: -9.563051, lng: -77.04039 },
    { lat: -9.563944, lng: -77.039846 },
    { lat: -9.564373, lng: -77.040036 },
    { lat: -9.56488, lng: -77.041716 },
    { lat: -9.565063, lng: -77.042354 },
    { lat: -9.564754, lng: -77.043581 },
    { lat: -9.563623, lng: -77.045511 },
    { lat: -9.563204, lng: -77.04613 },
    { lat: -9.562601, lng: -77.046069 }

  ]
  tuberiaCoordinates = [
    { lat: -10.111358, lng: -78.134642 },
    { lat: -10.140722, lng: -78.116115 },
    { lat: -10.151157, lng: -78.10208 },
    { lat: -10.192066, lng: -78.060284 },
    { lat: -10.197378, lng: -78.053854 },
    { lat: -10.202692, lng: -78.050149 },
    { lat: -10.212448, lng: -78.048589 },
    { lat: -10.22441, lng: -78.039567 },
    { lat: -10.23929, lng: -78.037137 },
    { lat: -10.264601, lng: -78.035651 },
    { lat: -10.298372, lng: -78.047132 },
    { lat: -10.302022, lng: -78.05026 },
    { lat: -10.306189, lng: -78.048382 },
    { lat: -10.312013, lng: -78.042236 },
    { lat: -10.31476, lng: -78.04342 },
    { lat: -10.317993, lng: -78.050917 },
    { lat: -10.321929, lng: -78.051474 },
    { lat: -10.326031, lng: -78.048813 },
    { lat: -10.33253, lng: -78.047982 },
    { lat: -10.344168, lng: -78.041979 },
    { lat: -10.347574, lng: -78.030688 },
    { lat: -10.351942, lng: -78.027356 },
    { lat: -10.353367, lng: -78.021296 },
    { lat: -10.355939, lng: -78.020348 },
    { lat: -10.361237, lng: -78.021956 },
    { lat: -10.364299, lng: -78.02008 },
    { lat: -10.397982, lng: -77.983461 },
    { lat: -10.408151, lng: -77.96715 },
    { lat: -10.414945, lng: -77.964368 },
    { lat: -10.422409, lng: -77.945063 },
    { lat: -10.422082, lng: -77.926886 },
    { lat: -10.424104, lng: -77.924408 },
    { lat: -10.42796, lng: -77.925444 },
    { lat: -10.43737, lng: -77.930668 },
    { lat: -10.444695, lng: -77.929252 },
    { lat: -10.451544, lng: -77.92308 },
    { lat: -10.463307, lng: -77.916461 },
    { lat: -10.491538, lng: -77.913616 },
    { lat: -10.508564, lng: -77.903347 },
    { lat: -10.522004, lng: -77.894234 },
    { lat: -10.556097, lng: -77.882611 },
    { lat: -10.561961, lng: -77.875529 },
    { lat: -10.581863, lng: -77.868817 },
    { lat: -10.587531, lng: -77.868973 },
    { lat: -10.595342, lng: -77.871449 },
    { lat: -10.605652, lng: -77.871096 },
    { lat: -10.632326, lng: -77.859725 },
    { lat: -10.639187, lng: -77.854531 },
    { lat: -10.645532, lng: -77.854682 },
    { lat: -10.650753, lng: -77.846681 },
    { lat: -10.655138, lng: -77.839988 },
    { lat: -10.663188, lng: -77.808268 },
    { lat: -10.650627, lng: -77.806711 },
    { lat: -10.63134, lng: -77.793455 },
    { lat: -10.622828, lng: -77.783243 },
    { lat: -10.613047, lng: -77.775324 },
    { lat: -10.598055, lng: -77.767519 },
    { lat: -10.577402, lng: -77.761839 },
    { lat: -10.570807, lng: -77.757166 },
    { lat: -10.552942, lng: -77.761319 },
    { lat: -10.548932, lng: -77.758829 },
    { lat: -10.540604, lng: -77.758856 },
    { lat: -10.523323, lng: -77.7579 },
    { lat: -10.508955, lng: -77.754734 },
    { lat: -10.492134, lng: -77.751837 },
    { lat: -10.488308, lng: -77.748863 },
    { lat: -10.486387, lng: -77.74519 },
    { lat: -10.475092, lng: -77.740051 },
    { lat: -10.466055, lng: -77.735136 },
    { lat: -10.458435, lng: -77.732716 },
    { lat: -10.450466, lng: -77.73252 },
    { lat: -10.436232, lng: -77.726339 },
    { lat: -10.430674, lng: -77.726295 },
    { lat: -10.42623, lng: -77.724425 },
    { lat: -10.425358, lng: -77.720187 },
    { lat: -10.42054, lng: -77.714148 },
    { lat: -10.413277, lng: -77.713017 },
    { lat: -10.406729, lng: -77.703414 },
    { lat: -10.395239, lng: -77.693676 },
    { lat: -10.386156, lng: -77.690248 },
    { lat: -10.384436, lng: -77.682072 },
    { lat: -10.367762, lng: -77.661684 },
    { lat: -10.365376, lng: -77.660072 },
    { lat: -10.366081, lng: -77.655357 },
    { lat: -10.355303, lng: -77.648925 },
    { lat: -10.347537, lng: -77.636093 },
    { lat: -10.336465, lng: -77.62586 },
    { lat: -10.325981, lng: -77.62716 },
    { lat: -10.313866, lng: -77.619621 },
    { lat: -10.311082, lng: -77.615157 },
    { lat: -10.309587, lng: -77.608959 },
    { lat: -10.303732, lng: -77.60354 },
    { lat: -10.291885, lng: -77.598792 },
    { lat: -10.283365, lng: -77.589592 },
    { lat: -10.280598, lng: -77.586107 },
    { lat: -10.269675, lng: -77.582181 },
    { lat: -10.263336, lng: -77.580822 },
    { lat: -10.249536, lng: -77.574993 },
    { lat: -10.237843, lng: -77.568518 },
    { lat: -10.233131, lng: -77.56234 },
    { lat: -10.211696, lng: -77.557078 },
    { lat: -10.205624, lng: -77.558279 },
    { lat: -10.203573, lng: -77.556171 },
    { lat: -10.192857, lng: -77.554345 },
    { lat: -10.187568, lng: -77.554606 },
    { lat: -10.182932, lng: -77.549425 },
    { lat: -10.174793, lng: -77.545275 },
    { lat: -10.17213, lng: -77.540254 },
    { lat: -10.172958, lng: -77.537982 },
    { lat: -10.171589, lng: -77.533047 },
    { lat: -10.16929, lng: -77.531886 },
    { lat: -10.151478, lng: -77.51771 },
    { lat: -10.148891, lng: -77.518179 },
    { lat: -10.145099, lng: -77.512448 },
    { lat: -10.144886, lng: -77.507581 },
    { lat: -10.144857, lng: -77.496546 },
    { lat: -10.149258, lng: -77.495882 },
    { lat: -10.152882, lng: -77.49037 },
    { lat: -10.153528, lng: -77.481617 },
    { lat: -10.15559, lng: -77.473677 },
    { lat: -10.156231, lng: -77.463713 },
    { lat: -10.159487, lng: -77.460094 },
    { lat: -10.154144, lng: -77.447198 },
    { lat: -10.151371, lng: -77.433258 },
    { lat: -10.14657, lng: -77.430591 },
    { lat: -10.144245, lng: -77.414988 },
    { lat: -10.13574, lng: -77.40324 },
    { lat: -10.134794, lng: -77.394022 },
    { lat: -10.139747, lng: -77.39132 },
    { lat: -10.14801, lng: -77.379797 },
    { lat: -10.151315, lng: -77.35922 },
    { lat: -10.156616, lng: -77.353395 },
    { lat: -10.15814, lng: -77.348827 },
    { lat: -10.169096, lng: -77.345028 },
    { lat: -10.170862, lng: -77.341839 },
    { lat: -10.1756, lng: -77.337242 },
    { lat: -10.171566, lng: -77.337082 },
    { lat: -10.166292, lng: -77.339064 },
    { lat: -10.156874, lng: -77.328491 },
    { lat: -10.145994, lng: -77.309696 },
    { lat: -10.142724, lng: -77.303726 },
    { lat: -10.138952, lng: -77.301483 },
    { lat: -10.133961, lng: -77.301264 },
    { lat: -10.128269, lng: -77.295713 },
    { lat: -10.124762, lng: -77.292343 },
    { lat: -10.119836, lng: -77.291304 },
    { lat: -10.118895, lng: -77.282815 },
    { lat: -10.110436, lng: -77.256449 },
    { lat: -10.083534, lng: -77.227492 },
    { lat: -10.080211, lng: -77.21862 },
    { lat: -10.084358, lng: -77.206682 },
    { lat: -10.085887, lng: -77.19433 },
    { lat: -10.090739, lng: -77.183399 },
    { lat: -10.083017, lng: -77.169785 },
    { lat: -10.074222, lng: -77.166528 },
    { lat: -10.057795, lng: -77.164963 },
    { lat: -10.069299, lng: -77.156668 },
    { lat: -10.068536, lng: -77.152051 },
    { lat: -10.058311, lng: -77.14235 },
    { lat: -10.048427, lng: -77.139889 },
    { lat: -10.043861, lng: -77.134621 },
    { lat: -10.033333, lng: -77.136058 },
    { lat: -10.027967, lng: -77.137804 },
    { lat: -10.01699, lng: -77.132957 },
    { lat: -10.009553, lng: -77.133174 },
    { lat: -9.998381, lng: -77.129157 },
    { lat: -9.993112, lng: -77.120383 },
    { lat: -9.989186, lng: -77.118169 },
    { lat: -9.990077, lng: -77.11192 },
    { lat: -9.982635, lng: -77.10426 },
    { lat: -9.966876, lng: -77.097136 },
    { lat: -9.958247, lng: -77.099869 },
    { lat: -9.945451, lng: -77.096157 },
    { lat: -9.945696, lng: -77.091688 },
    { lat: -9.929051, lng: -77.084094 },
    { lat: -9.927278, lng: -77.078585 },
    { lat: -9.904857, lng: -77.066026 },
    { lat: -9.900275, lng: -77.066737 },
    { lat: -9.899221, lng: -77.070003 },
    { lat: -9.897024, lng: -77.072666 },
    { lat: -9.890414, lng: -77.074356 },
    { lat: -9.881714, lng: -77.081337 },
    { lat: -9.862964, lng: -77.091065 },
    { lat: -9.860133, lng: -77.090843 },
    { lat: -9.863975, lng: -77.087289 },
    { lat: -9.864396, lng: -77.08255 },
    { lat: -9.867846, lng: -77.07879 },
    { lat: -9.862135, lng: -77.076759 },
    { lat: -9.857161, lng: -77.080497 },
    { lat: -9.854179, lng: -77.083846 },
    { lat: -9.854376, lng: -77.076951 },
    { lat: -9.848166, lng: -77.074537 },
    { lat: -9.847676, lng: -77.070028 },
    { lat: -9.846131, lng: -77.063544 },
    { lat: -9.842744, lng: -77.061567 },
    { lat: -9.84299, lng: -77.050279 },
    { lat: -9.846871, lng: -77.04582 },
    { lat: -9.855031, lng: -77.030551 },
    { lat: -9.862235, lng: -77.021737 },
    { lat: -9.871551, lng: -77.016812 },
    { lat: -9.8751, lng: -77.003054 },
    { lat: -9.868214, lng: -76.987469 },
    { lat: -9.873701, lng: -76.961733 },
    { lat: -9.889196, lng: -76.952491 },
    { lat: -9.896644, lng: -76.943642 },
    { lat: -9.899427, lng: -76.938663 },
    { lat: -9.745197, lng: -76.956176 },
    { lat: -9.71068, lng: -76.969475 },
    { lat: -9.716333, lng: -76.984455 },
    { lat: -9.703317, lng: -77.001735 },
    { lat: -9.689177, lng: -77.006713 },
    { lat: -9.676666, lng: -77.019414 },
    { lat: -9.653159, lng: -77.031084 },
    { lat: -9.638293, lng: -77.037502 },
    { lat: -9.627375, lng: -77.023217 },
    { lat: -9.619225, lng: -77.026302 },
    { lat: -9.612295, lng: -77.025297 },
    { lat: -9.605807, lng: -77.03056 },
    { lat: -9.602185, lng: -77.036322 },
    { lat: -9.578445, lng: -77.037738 }
  ]
  relaveCoords = [
    { lat: -9.536704, lng: -77.029857 },
    { lat: -9.538095, lng: -77.029639 },
    { lat: -9.539213, lng: -77.028779 },
    { lat: -9.540722, lng: -77.028282 },
    { lat: -9.542085, lng: -77.028362 },
    { lat: -9.542801, lng: -77.028655 },
    { lat: -9.544737, lng: -77.028847 },
    { lat: -9.545781, lng: -77.028275 },
    { lat: -9.546573, lng: -77.027702 },
    { lat: -9.547759, lng: -77.027311 },
    { lat: -9.548834, lng: -77.027643 },
    { lat: -9.549515, lng: -77.027683 },
    { lat: -9.549582, lng: -77.028515 },
    { lat: -9.550982, lng: -77.028342 },
    { lat: -9.55231, lng: -77.028242 },
    { lat: -9.553716, lng: -77.02713 },
    { lat: -9.555766, lng: -77.026274 },
    { lat: -9.556526, lng: -77.025158 },
    { lat: -9.55625, lng: -77.023169 },
    { lat: -9.557078, lng: -77.02274 },
    { lat: -9.560239, lng: -77.021964 },
    { lat: -9.562077, lng: -77.020529 },
    { lat: -9.562776, lng: -77.017605 },
    { lat: -9.564703, lng: -77.01477 },
    { lat: -9.565337, lng: -77.016726 },
    { lat: -9.564676, lng: -77.019324 },
    { lat: -9.566319, lng: -77.020563 },
    { lat: -9.564308, lng: -77.020985 },
    { lat: -9.565233, lng: -77.022364 },
    { lat: -9.568314, lng: -77.023032 },
    { lat: -9.568809, lng: -77.024264 },
    { lat: -9.565867, lng: -77.024247 },
    { lat: -9.564283, lng: -77.025249 },
    { lat: -9.563484, lng: -77.02698 },
    { lat: -9.56147, lng: -77.027835 },
    { lat: -9.562185, lng: -77.028201 },
    { lat: -9.564196, lng: -77.027851 },
    { lat: -9.565334, lng: -77.029593 },
    { lat: -9.567911, lng: -77.030548 },
    { lat: -9.5669, lng: -77.031699 },
    { lat: -9.565892, lng: -77.032271 },
    { lat: -9.565024, lng: -77.033495 },
    { lat: -9.563088, lng: -77.033266 },
    { lat: -9.560076, lng: -77.033104 },
    { lat: -9.557637, lng: -77.033017 },
    { lat: -9.55691, lng: -77.034531 },
    { lat: -9.557833, lng: -77.036271 },
    { lat: -9.559107, lng: -77.03917 },
    { lat: -9.556951, lng: -77.039808 },
    { lat: -9.553299, lng: -77.03863 },
    { lat: -9.553359, lng: -77.040582 },
    { lat: -9.551493, lng: -77.040715 },
    { lat: -9.549771, lng: -77.040633 },
    { lat: -9.547688, lng: -77.041126 },
    { lat: -9.545173, lng: -77.041762 },
    { lat: -9.541866, lng: -77.042754 },
    { lat: -9.540225, lng: -77.041226 },
    { lat: -9.539874, lng: -77.039923 },
    { lat: -9.539317, lng: -77.036956 },
    { lat: -9.537029, lng: -77.035714 },
    { lat: -9.538484, lng: -77.032253 },
    { lat: -9.536693, lng: -77.031736 },
    { lat: -9.536704, lng: -77.029857 }

  ]
  options: any = {
    lat: 33.5362475,
    lng: -111.9267386,
    zoom: 10,
    fillColor: '#DC143C',
    draggable: true,
    editable: true,
    visible: true
  };
  constructor(private incidenciaService: IncidenciaService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.listaIncidencia = this.incidenciaService.getAllIncidencia()
  }


  clickPoligono(idArea: string) {
    console.log("click")
    this.router.navigate(["../dashboard"], { relativeTo: this.route })
  }
  incidencia(evento) {
    console.log(evento)
  }
}
